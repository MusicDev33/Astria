import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentLayoutComponent } from './assignment-layout.component';

describe('AssignmentLayoutComponent', () => {
  let component: AssignmentLayoutComponent;
  let fixture: ComponentFixture<AssignmentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
