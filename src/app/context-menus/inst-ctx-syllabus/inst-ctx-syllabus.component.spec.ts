import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCtxSyllabusComponent } from './inst-ctx-syllabus.component';

describe('InstCtxSyllabusComponent', () => {
  let component: InstCtxSyllabusComponent;
  let fixture: ComponentFixture<InstCtxSyllabusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstCtxSyllabusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstCtxSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
