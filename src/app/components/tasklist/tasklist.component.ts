import { Component, OnInit, Input } from '@angular/core';

import { ITodoItem } from '@interfaces/todoitem.interface';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {

  @Input() todoItems: ITodoItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
