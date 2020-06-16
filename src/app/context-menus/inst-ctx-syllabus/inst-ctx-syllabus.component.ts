import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inst-ctx-syllabus',
  templateUrl: './inst-ctx-syllabus.component.html',
  styleUrls: ['./inst-ctx-syllabus.component.scss']
})
export class InstCtxSyllabusComponent implements OnInit {

  @Input()
  loading = false;

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
