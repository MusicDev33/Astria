import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCSettingsComponent } from './p-c-settings.component';

describe('PCSettingsComponent', () => {
  let component: PCSettingsComponent;
  let fixture: ComponentFixture<PCSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
