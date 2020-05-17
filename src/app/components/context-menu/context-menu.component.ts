import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  @Input()
  contentField = '';

  @Output()
  sendContentFieldChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onContentFieldChange(text: string) {
    this.sendContentFieldChange.emit(text);
  }

}
