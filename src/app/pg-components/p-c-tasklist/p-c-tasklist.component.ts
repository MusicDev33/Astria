import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-c-tasklist',
  templateUrl: './p-c-tasklist.component.html',
  styleUrls: ['./p-c-tasklist.component.scss']
})
export class PCTasklistComponent implements OnInit {

  tasks: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
