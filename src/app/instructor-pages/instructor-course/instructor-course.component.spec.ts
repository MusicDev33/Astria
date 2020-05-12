import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseComponent } from './instructor-course.component';

describe('InstructorCourseComponent', () => {
  let component: InstructorCourseComponent;
  let fixture: ComponentFixture<InstructorCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
