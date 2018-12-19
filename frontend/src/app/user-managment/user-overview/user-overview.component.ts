import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


  export interface User {
    name: string,
    password: string,
    role: string
  }

  const USER_DATA: User[] = [
    {name: 'test', password: 'test', role: 'admin'},
    {name: 'test2', password: 'test2', role: 'user'}
  ]

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {



  dataSource = new MatTableDataSource<User>(USER_DATA);
  columnsToDisplay = ['userName', 'userRole', 'userEdit', 'userDelete']


  constructor() { }

  ngOnInit() {
  }

}
