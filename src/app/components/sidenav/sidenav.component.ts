import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input()
  onDashboard: boolean;

  @Input()
  currentDashParam = '';

  @Output()
  sendParamChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }

  iconClicked(param: string) {
    this.sendParamChange.emit(param);
  }
}
