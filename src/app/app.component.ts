import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AuthService } from '@services/auth.service';
import {  CookieService } from 'ngx-cookie-service';

import { routeNavMap } from './app.component.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Meteor';
  currentRoute: string;

  showTopNav = true;
  showSideNav = true;

  adminAuth = false;

  excludedAuthRoutes = ['login', 'register'];

  onDashboard = false;
  currentDashParam = 'courses';

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    private cookieService: CookieService,
    private changeDet: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.router.events.subscribe(this.onUrlChange.bind(this));
  }

  changeDashParam(param: string) {
    this.currentDashParam = param;
    this.changeDet.detectChanges();
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

      if (routeName.includes('dashboard')) {
        this.onDashboard = true;
      } else {
        this.onDashboard = false;
      }

      if (routeName === 'login' && !this.cookieService.check('jwt')) {
        this.adminAuth = false;
      }

      if (!this.excludedAuthRoutes.includes(routeName)) {
        this.authService.authRequest(['mt-admin', 'instructor']).subscribe((res: any) => {
          if (res.success) {
            this.adminAuth = true;
          }
        });
      }

      this.changeDet.detectChanges();
    }
  }
}
