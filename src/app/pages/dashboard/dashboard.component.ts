import { Component, OnInit } from '@angular/core';
import { ICourse } from '@interfaces/course.interface';
import { IEvent } from '@interfaces/event.interface';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  eventOne: IEvent;
  eventTwo: IEvent;

  smallView = false;

  selectedModule = 'calendar';
  enrolledCourses: ICourse[] = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.eventOne = {
      icon: 'fas fa-bong',
      iconColor: '#ff6161',
      iconBgColor: '#fedede',
      header: 'LearnSmarts are due!',
      details: 'All LearnSmarts are due on the 30th!'
    };

    this.eventTwo = {
      icon: 'fas fa-calculator',
      iconColor: '#3472fe',
      iconBgColor: '#c4f8ff',
      header: 'Chapter 5.3 homework',
      details: 'Reminder: your homework is released now.'
    };
  }

}
