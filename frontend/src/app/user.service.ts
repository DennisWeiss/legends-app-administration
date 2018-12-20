import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import {environment} from '../environments/environment';
import { User } from './auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.backendUrl}users`);
  }

  saveUser(userObj) {
    // remove flag from overview
    const {isEditing, ...user} = userObj;

    return this.http.post(`${environment.backendUrl}users/${user._id}`, user);
  }

  deleteUser(id) {
    return this.http.delete<{message: string}>(`${environment.backendUrl}users/${id}`);
  }

}
