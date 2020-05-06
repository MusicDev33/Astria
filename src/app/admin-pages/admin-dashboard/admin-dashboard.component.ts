import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

import { ISchool } from '@interfaces/school.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  selectedClassID = '';
  createSchoolMode = false;

  // Create School Mode
  instNameField = '';
  instLocationField = '';

  usu = {
    name: 'Utah State University',
    location: 'Logan, Utah',
    asID: 'usu',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Utah_State_Aggies_logo.svg/1200px-Utah_State_Aggies_logo.svg.png'
  };

  bsu = {
    name: 'Boise State University',
    location: 'Boise, Idaho',
    asID: 'bsu',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Boise_State_%22B%22_logo.svg/1280px-Boise_State_%22B%22_logo.svg.png'
  };

  osu = {
    name: 'Ohio State University',
    location: 'Columbus, Ohio',
    asID: 'osu',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ohio_State_Buckeyes_logo.svg/1041px-Ohio_State_Buckeyes_logo.svg.png'
  };

  tamu = {
    name: 'Texas A&M University',
    location: 'College Station, Texas',
    asID: 'tamu',
    img: 'https://i.pinimg.com/originals/3c/4a/ae/3c4aae17af2106d390f9290874809210.png'
  };

  schools = [this.usu, this.bsu, this.osu, this.tamu];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authRequest('as-admin').subscribe((res: any) => {
      if (!res.success) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  selectSchool(classID: string) {
    if (classID === this.selectedClassID) {
      this.selectedClassID = '';
      return;
    }
    this.selectedClassID = classID;
  }

  sendSchool() {
    const newSchool: ISchool = {
      name: this.instNameField,
      location: this.instLocationField,
      img: 'https://i.pinimg.com/originals/3c/4a/ae/3c4aae17af2106d390f9290874809210.png',
      asID: this.instNameField.replace(/[a-z &-_!.,]/g, '')
    };
  }

}
