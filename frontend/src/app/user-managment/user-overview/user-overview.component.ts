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

  constructor(private authService: AuthService, private userService: UserService, private snackBarService: SnackbarService) { }

  ngOnInit() {

    this.userService.getUsers().pipe(take(1)).subscribe((users) => {
      console.log('users', users);
      this.users = users;
      this.initializeTableDataSource();
    });
  }

  initializeTableDataSource = () => {
    this.dataSource = new MatTableDataSource(this.users)
  }

  saveUser(user) {
    this.userService.saveUser(user).pipe(take(1)).subscribe();
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

  showRow(row) {
    console.log('row', row);
  }

}
