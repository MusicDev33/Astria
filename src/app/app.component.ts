import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AuthService } from '@services/auth.service';

import { routeNavMap } from './app.component.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Astria';
  currentRoute: string;

  showTopNav = true;
  showSideNav = true;

  adminAuth = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(this.onUrlChange.bind(this));
  }

  onUrlChange(ev: any) {
    if (ev instanceof NavigationEnd) {
      const url = ev.url;
      this.currentRoute = url;

      const routeName = this.currentRoute.replace(/[\/]/g, '');
      if (routeNavMap.hasOwnProperty(routeName)) {
        this.showTopNav = routeNavMap[routeName].topNav;
        this.showSideNav = routeNavMap[routeName].sideNav;
      }

      if (routeName === 'dashboard') {
        this.authService.authRequest(['as-admin', 'instructor']).subscribe((res: any) => {
          if (res.success) {
            this.adminAuth = true;
          }
        });
      }
    }
  }
}
