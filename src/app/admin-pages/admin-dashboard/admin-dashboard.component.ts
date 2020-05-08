import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { SchoolService } from '@services/school.service';
import { PersonService } from '@services/person.service';

import { ISchool } from '@interfaces/school.interface';
import { IPerson } from '@interfaces/person.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  selectedSchoolID = '';
  selectedTeacherID = '';

  createSchoolMode = false;
  createTeacherMode = false;
  createCourseMode = false;

  // Create School Mode
  instNameField = '';
  instLocationField = '';

  instructorNameField = '';
  instructorEmailField = '';

  schools: ISchool[];
  instructors: IPerson[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private schoolService: SchoolService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.authService.authRequest(['as-admin', 'instructor']).subscribe((res: any) => {
      if (!res.success) {
        console.log('move');
        this.router.navigate(['/dashboard']);
      }
    });

    this.schoolService.getAllSchools().subscribe((res: any) => {
      if (res.success) {
        this.schools = res.schools;
      }
    });
  }

  selectSchool(schoolID: string) {
    if (schoolID === this.selectedSchoolID) {
      this.selectedSchoolID = '';
      return;
    }
    this.selectedSchoolID = schoolID;
    this.schoolService.getSchoolInstructors(schoolID).subscribe((res: any) => {
      if (res.success) {
        this.instructors = res.instructors;
      }
    });
  }

  selectInstructor(profileURL: string) {
    if (profileURL === this.selectedTeacherID) {
      this.selectedTeacherID = '';
      return;
    }
    this.selectedTeacherID = profileURL;
  }

  sendSchool() {
    const newSchool: ISchool = {
      name: this.instNameField,
      location: this.instLocationField,
      img: 'https://i.pinimg.com/originals/3c/4a/ae/3c4aae17af2106d390f9290874809210.png',
      asID: this.instNameField.replace(/[a-z &\-_!.,]/g, '').toLowerCase()
    };

    this.schoolService.createSchool(newSchool).subscribe((res: any) => {
      if (res.success) {
        this.instNameField = '';
        this.instLocationField = '';
        this.createSchoolMode = false;
      }
    });
  }

  sendInstructor() {
    const newInstructor: IPerson = {
      bio: '',
      profileURL: '',
      schoolID: this.selectedSchoolID,
      name: this.instructorNameField,
      email: this.instructorEmailField,
      password: '',
      enrolledCourses: [],
      taughtCourses: [],
      personType: 'instructor'
    };

    this.personService.createInstructor(newInstructor).subscribe((res: any) => {
      if (res.success) {
        this.instructorNameField = '';
        this.instructorEmailField = '';
        this.createTeacherMode = false;
        console.log(res);
      }
    });
  }
}
