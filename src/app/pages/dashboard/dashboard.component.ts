import { Component, OnInit } from '@angular/core';
import { ICourse } from '@interfaces/course.interface';
import { IEvent } from '@interfaces/event.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  course: ICourse;
  linAl: ICourse;
  oChem: ICourse;

  eventOne: IEvent;
  eventTwo: IEvent;

  constructor() { }

  ngOnInit(): void {
    this.course = {
      icon: 'fas fa-palette',
      iconColor: '#d339fc',
      iconBgColor: '#f2c1ff',
      image: '',
      name: 'Strategy, Design, Development',
      instructor: 'Shelby McNotCowan',
      description: 'Learn UX and web design from a guy who doesn\'t hold a formal degree in literally anything. You probably won\'t learn anything useful.',
      tags: ['UI Design', 'UX Design', 'Web Design']
    };

    this.linAl = {
      icon: 'fas fa-calculator',
      iconColor: '#3472fe',
      iconBgColor: '#c4f8ff',
      image: '',
      name: 'Linear Algebra',
      instructor: 'Leoncio Quinones',
      description: 'Matrices, vector spaces, and an introduction to proof-based mathematics. Shoot for an A so you can be disappointed when you get a C-.',
      tags: ['Math', 'Proof-based']
    };

    this.oChem = {
      icon: 'fas fa-bong',
      iconColor: '#ff6161',
      iconBgColor: '#fedede',
      image: '',
      name: 'Organic Chemistry',
      instructor: 'Bradley Davidson',
      description: 'We go over the fundamentals of organic chemistry (and a bunch of other stuff you\'ll hate)',
      tags: ['Chemistry', 'Benzene', 'Failed Class']
    };

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
