import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable, BehaviorSubject, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';


export interface UserData {
  user: User;
  token: string;
  expiresIn: number;
}

export interface User {
  _id: string;
  username: string;
  rights: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  userData: UserData;
  private _authStatusChanged = new BehaviorSubject<User>(null);
  tokenRefreshSub;

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

  constructor(private http: HttpClient) { }

  login(username, password): Observable<void> {
    return this.http.post<UserData>(`${environment.backendUrl}auth/login`, {username, password})
    .pipe(map((userData) => {
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
    localStorage.setItem('token', token );
  }

  private setupTokenRefresh(exp): void {
    const refreshTime = (exp * 1000) / 4;
    this.tokenRefreshSub = interval(refreshTime).subscribe(x => {
      this.getNewToken().pipe(take(1)).subscribe(() => {
      });
    });
  }

  private getNewToken(): Observable<any> {
    return this.http.post<UserData>(`${environment.backendUrl}auth/verify`, {})
    .pipe(map((userData) => {
      this.saveToken(userData.token);
    }));
  }

  ngOnDestroy() {
    this.tokenRefreshSub.unsubscribe();
  }

}
