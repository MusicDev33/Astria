import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsShortansComponent } from './ans-shortans.component';

describe('AnsShortansComponent', () => {
  let component: AnsShortansComponent;
  let fixture: ComponentFixture<AnsShortansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsShortansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsShortansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
