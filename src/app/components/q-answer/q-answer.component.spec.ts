import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QAnswerComponent } from './q-answer.component';

describe('QAnswerComponent', () => {
  let component: QAnswerComponent;
  let fixture: ComponentFixture<QAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
