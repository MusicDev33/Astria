import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCCalendarComponent } from './p-c-calendar.component';

describe('PCCalendarComponent', () => {
  let component: PCCalendarComponent;
  let fixture: ComponentFixture<PCCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
