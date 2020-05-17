import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCtxStudentsComponent } from './inst-ctx-students.component';

describe('InstCtxStudentsComponent', () => {
  let component: InstCtxStudentsComponent;
  let fixture: ComponentFixture<InstCtxStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstCtxStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstCtxStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
