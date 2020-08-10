import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtxMenuGeneralComponent } from './ctx-menu-general.component';

describe('CtxMenuGeneralComponent', () => {
  let component: CtxMenuGeneralComponent;
  let fixture: ComponentFixture<CtxMenuGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtxMenuGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtxMenuGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
