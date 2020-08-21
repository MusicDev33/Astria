import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-q-answer',
  templateUrl: './q-answer.component.html',
  styleUrls: ['./q-answer.component.scss']
})
export class QAnswerComponent implements OnInit {

  // If anyone knows how to type this without ruining code quality,
  // please tell me :'(
  @Input()
  layout: any;

  @Output()
  emitLayoutChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (this.layout.type === 'multichoice') {
      this.layout['selectedAnswer'] = '';
    } else if (this.layout.type === 'checkbox') {
      this.layout['selectedAnswers'] = [];
    } else if (this.layout.type === 'essay' || this.layout.type === 'shortanswer') {
      this.layout['userAnswer'] = '';
    }
    this.layout['answered'] = false;
  }

  setAnswer(answer: any) {
    if (this.layout.type === 'multichoice') {
      this.layout.answers.forEach((qAnswer: any) => {
        qAnswer['selected'] = false;
      });
      answer['selected'] = true;
      this.layout.answered = true;
    } else if (this.layout.type === 'checkbox') {
      if (answer.hasOwnProperty('selected')) {
        answer.selected = !answer.selected;
      } else {
        answer['selected'] = true;
      }
      this.layout.answered = false;

      this.layout.answers.forEach((layoutAnswer: any) => {
        if (layoutAnswer.selected) {
          this.layout.answered = true;
        }
      });
    }
  }

  textFieldInput(text: string) {
    if (text) {
      this.layout.answered = true;
    } else {
      this.layout.answered = false;
    }
  }
}
