import { Component, OnInit, Input } from '@angular/core';
import { SharedRouteService } from '@services/shared-route.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input()
  onDashboard: boolean;

  currentDashParam = '';

  constructor(private sharedRoute: SharedRouteService) {
    this.sharedRoute.paramEmitted.subscribe((param: string) => {
      this.currentDashParam = param;
    });
  }

  ngOnInit(): void { }
}
