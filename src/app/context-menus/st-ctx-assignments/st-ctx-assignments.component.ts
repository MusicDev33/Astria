import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-st-ctx-assignments',
  templateUrl: './st-ctx-assignments.component.html',
  styleUrls: ['./st-ctx-assignments.component.scss']
})
export class StCtxAssignmentsComponent implements OnInit {

  @Input()
  percentCompleted = 0;

  // We need this to get flagged questions
  @Input()
  questions: any[];

  @Output()
  emitIDClicked = new EventEmitter<string>();

  @Output()
  emitSubmitButton = new EventEmitter<boolean>();

  cutePugs = [
    'https://media1.popsugar-assets.com/files/thumbor/26OimuxpHckL_AatP7_bCOpjimM/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/07/29/044/n/44498184/e1a4c790b526f7d3_GettyImages-107599388/i/Cute-Pictures-Pugs.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/714unRWIbVL._AC_SX425_.jpg',
    'https://3.bp.blogspot.com/-Qk0DmUGpytA/UMIKOjQhnbI/AAAAAAAAC3A/9cS0Vl9Z2Xg/s1600/cute-pug-puppies-1.jpg',
    'https://cutewallpaper.org/21/wallpapers-of-pugs/Cute-Pug-Wallpapers-Top-Free-Cute-Pug-Backgrounds-.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/510K%2BmJcGML._AC_.jpg',
    'https://imgix.ranker.com/user_node_img/50026/1000504468/original/big-eyes-photo-u1?w=375&q=60&fm=pjpg&dpr=2'
  ];

  stressRelief = false;
  pugIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  questionClicked(id: string) {
    this.emitIDClicked.emit(id);
  }

  submitButtonPressed() {
    this.emitSubmitButton.emit(true);
  }

  incrementPugIndex() {
    this.pugIndex += 1;
    if (this.pugIndex > this.cutePugs.length - 1) {
      this.pugIndex = 0;
    }
  }

  imgContainerClicked() {
    if (!this.stressRelief) {
      this.stressRelief = true;
    } else {
      this.incrementPugIndex();
    }
  }
}
