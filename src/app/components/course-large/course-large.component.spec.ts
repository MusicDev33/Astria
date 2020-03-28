import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLargeComponent } from './course-large.component';

describe('CourseLargeComponent', () => {
  let component: CourseLargeComponent;
  let fixture: ComponentFixture<CourseLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
