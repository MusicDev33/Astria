import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCtxHomeComponent } from './inst-ctx-home.component';

describe('InstCtxHomeComponent', () => {
  let component: InstCtxHomeComponent;
  let fixture: ComponentFixture<InstCtxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstCtxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstCtxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
