import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrls: ['./icon-card.component.scss']
})
export class IconCardComponent implements OnInit {

  @Input() icon: string;
  @Input() selected = false;

  constructor() { }

  ngOnInit(): void {
  }

}
