import { Component, OnInit } from '@angular/core';

import headersMD from './sections/headers';
import linksMD from './sections/links';
import spacingMD from './sections/spacing';
import listsMD from './sections/lists';

@Component({
  selector: 'app-markdown-help',
  templateUrl: './markdown-help.component.html',
  styleUrls: ['./markdown-help.component.scss']
})
export class MarkdownHelpComponent implements OnInit {

  sections = [
    headersMD,
    linksMD,
    spacingMD,
    listsMD
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
