import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/user.service';
import { take } from 'rxjs/operators';
import { User, AuthService } from 'src/app/auth/auth.service';
import SnackbarService from 'src/app/snackbar.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {

  users: User[];
  dataSource;
  columnsToDisplay = ['userName', 'userRole', 'userPassword', 'userEdit', 'userDelete']

  // cache to save permissions while editing
  tempPerms: string[];

  // all permissions that can be assigned to a user (fetched from backend)
  availablePerms: string[] = [];

  constructor(private authService: AuthService, private userService: UserService, private snackBarService: SnackbarService) { }

  ngOnInit() {
    this.userService.getUsersAndAvailablePerms().pipe(take(1)).subscribe((data) => {
      this.users = data.users;
      this.availablePerms = data.permissions;
      this.initializeTableDataSource();
    });
  }

  initializeTableDataSource = () => {
    this.dataSource = new MatTableDataSource(this.users)
  }

  saveUser(user) {
    this.userService.saveUser(user).pipe(take(1)).subscribe((res) => {
      this.snackBarService.openSnackBar(res.message, 'OK');
    });
  }

  deleteUser(user) {

    if (!window.confirm('You really want to delete this user?')) {
      return;
    }

    this.userService.deleteUser(user._id).pipe(take(1)).subscribe((res) => {
      this.users = this.users.filter((u) => {
        return u._id !== user._id
      })
      this.initializeTableDataSource();
      this.snackBarService.openSnackBar(res.message, 'OK');
    });
  }

  createUser(user) {
    user.permissions = this.tempPerms;
    console.log('user', user);
    this.userService.createUser(user).pipe(take(1)).subscribe((res) => {
      this.users.push(res.user);
      this.initializeTableDataSource();
      this.snackBarService.openSnackBar(res.message, 'OK');
    })
  }

  showRow(row) {
    console.log('row', row);
  }

}
