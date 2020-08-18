import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-q-answer',
  templateUrl: './q-answer.component.html',
  styleUrls: ['./q-answer.component.scss']
})
export class QAnswerComponent implements OnInit {

  @Input()
  layout: any;

  constructor() { }

  ngOnInit(): void {
  }

}
