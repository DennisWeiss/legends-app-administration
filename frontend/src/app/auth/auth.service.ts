import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {Subject, Observable, BehaviorSubject, interval} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthGroup} from './permission/authorization.types';


export interface UserData {
  user: User;
  token: string;
  expiresIn: number;
}

export interface User {
  _id: string;
  username: string;
  rights: string[];
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  userData: UserData;
  private _authStatusChanged = new BehaviorSubject<User>(null);
  tokenRefreshSub;

  permissions: string [];

  get token() {
    return this.userData.token;
  }

  get user() {
    return {username: this.userData.user.username};
  }

  get authStatusChanged() {
    return this._authStatusChanged.asObservable();
  }

  get authState() {
    return this._authStatusChanged.value;
  }

  constructor(private http: HttpClient) {
  }

  login(username, password): Observable<void> {
    return this.http.post<UserData>(`${environment.backendUrl}auth/login`, {username, password})
      .pipe(map((userData) => {
        console.log('login result')
        this.userData = userData;

        this.saveToken(this.userData.token);
        this.setupTokenRefresh(userData.expiresIn);

        this._authStatusChanged.next(this.userData.user);
      }));
  }

  verify = () => this.http
    .post<UserData>(`${environment.backendUrl}auth/verify`, {})
    .pipe(map(userData => {
      this.userData = userData;

      this.saveToken(userData.token);
      this.setupTokenRefresh(userData.expiresIn);

      this._authStatusChanged.next(this.userData.user)
    }))

  logout(): void {
    localStorage.removeItem('token');
    this.tokenRefreshSub.unsubscribe();
    this._authStatusChanged.next(null);
  }

  saveToken(token): void {
    localStorage.setItem('token', token);
  }

  private setupTokenRefresh(exp): void {

    // make sure old subscription is resolved
    if (this.tokenRefreshSub) {
      this.tokenRefreshSub.unsubscribe();
    }

    // refresh after 1/4 of the expiration time
    const refreshTime = (exp * 1000) / 4;

    this.tokenRefreshSub = interval(refreshTime).subscribe(x => {
      this.getNewToken().pipe(take(1)).subscribe((userData) => {
        this.saveToken(userData.token);
      });
    });
  }

  private getNewToken(): Observable<UserData> {
    return this.http.post<UserData>(`${environment.backendUrl}auth/verify`, {});
  }

  hasPermission(authGroup) {

    if (this.userData.user.permissions[0] === 'ADMIN') {
      return true;
    }

    // no permission required
    if (!authGroup) {
      return true;
    }

    if (this.userData && this.userData.user.permissions.find(permission => {
      return permission === authGroup
    })) {
      return true;
    }
    return false;
  }


  ngOnDestroy() {
    this.tokenRefreshSub.unsubscribe();
  }

}
