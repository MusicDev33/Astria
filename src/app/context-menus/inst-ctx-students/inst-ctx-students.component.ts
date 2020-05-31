import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inst-ctx-students',
  templateUrl: './inst-ctx-students.component.html',
  styleUrls: ['./inst-ctx-students.component.scss']
})
export class InstCtxStudentsComponent implements OnInit {

  @Input()
  mode = 'create';

  // Create Mode Variables
  studentIDField = '';

  @Output()
  sendEnrollStudentPressed = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onEnrollStudentPressed() {
    this.sendEnrollStudentPressed.emit(this.studentIDField);
    this.studentIDField = '';
  }
}
