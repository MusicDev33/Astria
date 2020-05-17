import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCtxAssignmentsComponent } from './inst-ctx-assignments.component';

describe('InstCtxAssignmentsComponent', () => {
  let component: InstCtxAssignmentsComponent;
  let fixture: ComponentFixture<InstCtxAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstCtxAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstCtxAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
