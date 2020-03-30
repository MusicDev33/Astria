import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCEventComponent } from './p-c-event.component';

describe('PCEventComponent', () => {
  let component: PCEventComponent;
  let fixture: ComponentFixture<PCEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
