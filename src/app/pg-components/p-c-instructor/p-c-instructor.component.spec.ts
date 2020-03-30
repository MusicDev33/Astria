import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCInstructorComponent } from './p-c-instructor.component';

describe('PCInstructorComponent', () => {
  let component: PCInstructorComponent;
  let fixture: ComponentFixture<PCInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
