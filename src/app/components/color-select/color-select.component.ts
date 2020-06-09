import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-color-select',
  templateUrl: './color-select.component.html',
  styleUrls: ['./color-select.component.scss']
})
export class ColorSelectComponent implements OnInit {

  @Input() color: any;
  @Input() selected = false;

  iconHovered = false;

  constructor() { }

  ngOnInit(): void {
  }

}
