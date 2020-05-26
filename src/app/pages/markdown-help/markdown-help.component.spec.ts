import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownHelpComponent } from './markdown-help.component';

describe('MarkdownHelpComponent', () => {
  let component: MarkdownHelpComponent;
  let fixture: ComponentFixture<MarkdownHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
