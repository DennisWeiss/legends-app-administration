import { Component, OnInit, Input } from '@angular/core';
import { PoiService } from '../shared/services/poi.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  isAuthenticated = false;
  @Input() sidenav;

  $authStatus: Observable<any>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.$authStatus = this.authService.authStatusChanged;
  }


  logout() {
    this.authService.logout();
    this.sidenav.close();
    this.router.navigate(['/login']);
  }

}
