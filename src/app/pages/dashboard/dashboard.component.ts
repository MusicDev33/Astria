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

  anatomy: ICourse;
  linAl: ICourse;
  oChem: ICourse;
  compSci: ICourse;
  psych: ICourse;

  eventOne: IEvent;
  eventTwo: IEvent;

  smallView = false;

  selectedModule = 'calendar';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    /*
    this.anatomy = {
      icon: 'fas fa-skull',
      iconColor: '#24ff00',
      iconBgColor: '#dffce8',
      image: '',
      name: 'Human Anatomy',
      instructor: 'Andy Andersen',
      description: 'We go over how your body works, certainly something we all should know about.',
      tags: ['Human', 'Anatomy', 'Biology']
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

    this.compSci = {
      icon: 'fas fa-laptop-code',
      iconColor: '#ffde01',
      iconBgColor: '#fffbcd',
      image: '',
      name: 'Computer Science II',
      instructor: 'Karl Mortensen',
      description: 'Computers and science but you won\'t learn how to code.',
      tags: ['Computer', 'Code', 'Bruh']
    };

    this.psych = {
      icon: 'fas fa-brain',
      iconColor: '#f200ff',
      iconBgColor: '#f6cffe',
      image: '',
      name: 'Abnormal Psychology',
      instructor: 'Michael Twohig',
      description: 'A course on unusual patterns of behvaiour, emotions, and thought.',
      tags: ['Brain', 'Psychology', 'Clinical']
    };
    */

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
