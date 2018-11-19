import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


export interface UserData {
  user: User
  token: string;
}

export interface User {
  _id: string,
  username: string;
  rights: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: UserData;
  private _authStatusChanged = new BehaviorSubject<User>(null);

  get token() {
    return this.userData.token;
  }

  get user() {
    return {username: this.userData.user.username};
  }

  get authStatusChanged() {
    return this._authStatusChanged.asObservable();
  }

  constructor(private http: HttpClient) { }

  login(username, password): Observable<any> {
    return this.http.post<UserData>(`${environment.backendUrl}auth/login`, {username, password})
    .pipe(map((userData) => {
      console.log('userData', userData);
      this.userData = userData;
      this._authStatusChanged.next(this.userData.user);
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this._authStatusChanged.next(null);
  }

  saveToken(token) {
    localStorage.setItem('token', token );
  }


}
