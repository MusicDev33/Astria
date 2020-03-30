import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCTasklistComponent } from './p-c-tasklist.component';

describe('PCTasklistComponent', () => {
  let component: PCTasklistComponent;
  let fixture: ComponentFixture<PCTasklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCTasklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
