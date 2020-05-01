import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(this.onUrlChange.bind(this));
  }

  onUrlChange(ev: any) {
    if (ev instanceof NavigationEnd) {
      const url = ev.url;
      this.currentRoute = url;

      const routeName = this.currentRoute.replace(/[\/]/, '');
      if (routeNavMap.hasOwnProperty(routeName)) {
        console.log('changed');
        this.showTopNav = routeNavMap[routeName].topNav;
        this.showSideNav = routeNavMap[routeName].sideNav;
      }
    }
  }
}
