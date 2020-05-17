import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstCtxAnnouncementsComponent } from './inst-ctx-announcements.component';

describe('InstCtxAnnouncementsComponent', () => {
  let component: InstCtxAnnouncementsComponent;
  let fixture: ComponentFixture<InstCtxAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstCtxAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstCtxAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
