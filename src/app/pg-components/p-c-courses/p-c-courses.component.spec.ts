import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCCoursesComponent } from './p-c-courses.component';

describe('PCCoursesComponent', () => {
  let component: PCCoursesComponent;
  let fixture: ComponentFixture<PCCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
