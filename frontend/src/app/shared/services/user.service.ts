import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http'
import {environment} from '../../../environments/environment';
import { User } from '../../auth/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsersAndAvailablePerms(): Observable<{users: User[], permissions: string[]}> {
    return this.http.get<{users: User[], permissions: string[]}>(`${environment.backendUrl}users`);
  }

  saveUser(userObj) {
    // remove flag from overview
    const {isEditing, ...user} = userObj;

    return this.http.put<{message: string}>(`${environment.backendUrl}users/${user._id}`, user);
  }

  deleteUser(id) {
    return this.http.delete<{message: string}>(`${environment.backendUrl}users/${id}`);
  }

  createUser(user) {
    return this.http.post<{message: string, user: User}>(`${environment.backendUrl}auth/register`, user);
  }

}
