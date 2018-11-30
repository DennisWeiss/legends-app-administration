import {Component, OnInit} from '@angular/core'
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Legends App Administration'

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
}
