// This sucks
import 'bootstrap';
import * as $ from 'jquery';

import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { AuthService } from '@services/auth.service';
import {  CookieService } from 'ngx-cookie-service';

import { routeNavMap } from './app.component.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit {
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
    private cookieService: CookieService
  ) { }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    // This is to load tooltips for Bootstrap, instead of installing more 3rd-party libraries
    // https://getbootstrap.com/docs/4.5/components/tooltips/
    // This is also for activating all of the Bootstrap stuff
    $('.sidenav-icon[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    $('.dropdown-toggle').dropdown();
  }

  ngAfterViewInit() {
    this.router.events.subscribe(this.onUrlChange.bind(this));
  }

  changeDashParam(param: string) {
    this.currentDashParam = param;
  }

  onUrlChange(ev: any) {
    if (ev instanceof NavigationEnd) {
      console.log('testing');
      const url = ev.url;
      this.currentRoute = url;

      const routeName = this.currentRoute.replace(/[\/]/g, '');
      console.log(routeName);
      if (routeNavMap.hasOwnProperty(routeName)) {
        this.showTopNav = routeNavMap[routeName].topNav;
        this.showSideNav = routeNavMap[routeName].sideNav;
      }

      if (routeName.includes('dashboard')) {
        this.onDashboard = true;
        console.log('on');
      } else {
        this.onDashboard = false;
        console.log('off');
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
    }
  }
}
