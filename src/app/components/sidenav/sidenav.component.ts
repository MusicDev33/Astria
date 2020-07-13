import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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

  constructor(private sharedRoute: SharedRouteService, private changeDet: ChangeDetectorRef) {
    this.sharedRoute.paramEmitted.subscribe((param: string) => {
      this.currentDashParam = param;
      this.changeDet.detectChanges();
    });
  }

  ngOnInit(): void { }
}
