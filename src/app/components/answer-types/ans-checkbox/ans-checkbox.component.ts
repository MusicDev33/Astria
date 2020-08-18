import { Component, OnInit, Input } from '@angular/core';
import { ILayout } from '@models/layout.model';

@Component({
  selector: 'app-ans-checkbox',
  templateUrl: './ans-checkbox.component.html',
  styleUrls: ['./ans-checkbox.component.scss']
})
export class AnsCheckboxComponent implements OnInit {

  @Input()
  layout: ILayout;

  constructor() { }

  ngOnInit(): void {
  }

}
