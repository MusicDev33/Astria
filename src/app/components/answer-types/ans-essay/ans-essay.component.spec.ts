import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsEssayComponent } from './ans-essay.component';

describe('AnsEssayComponent', () => {
  let component: AnsEssayComponent;
  let fixture: ComponentFixture<AnsEssayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnsEssayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsEssayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
