import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = 'login';

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  login(vals) {
    this.authService.login(vals.username, vals.password).subscribe(() => {
      this.router.navigate(['']);
    }, (err) => {
    });
  }

}
