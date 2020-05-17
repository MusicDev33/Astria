import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inst-ctx-home',
  templateUrl: './inst-ctx-home.component.html',
  styleUrls: ['./inst-ctx-home.component.scss']
})
export class InstCtxHomeComponent implements OnInit {

  @Input()
  contentField = '';

  @Output()
  sendContentFieldChange = new EventEmitter<string>();

  @Output()
  sendSaveContent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onContentFieldChange(text: string) {
    this.sendContentFieldChange.emit(text);
  }

  onSaveContentButton() {
    this.sendSaveContent.emit(this.contentField);
  }
}
