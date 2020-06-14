import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCAnnouncementsComponent } from './p-c-announcements.component';

describe('PCAnnouncementsComponent', () => {
  let component: PCAnnouncementsComponent;
  let fixture: ComponentFixture<PCAnnouncementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCAnnouncementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
