import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsCheckboxComponent } from './ans-checkbox.component';

describe('AnsCheckboxComponent', () => {
  let component: AnsCheckboxComponent;
  let fixture: ComponentFixture<AnsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
