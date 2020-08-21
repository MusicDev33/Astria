import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StCtxAssignmentsComponent } from './st-ctx-assignments.component';

describe('StCtxAssignmentsComponent', () => {
  let component: StCtxAssignmentsComponent;
  let fixture: ComponentFixture<StCtxAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StCtxAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StCtxAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
