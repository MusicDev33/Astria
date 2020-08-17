import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsMultichoiceComponent } from './ans-multichoice.component';

describe('AnsMultichoiceComponent', () => {
  let component: AnsMultichoiceComponent;
  let fixture: ComponentFixture<AnsMultichoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsMultichoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsMultichoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
