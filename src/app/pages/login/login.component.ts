import { Component, OnInit } from '@angular/core';
import { RegisterService } from '@services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mode = 'login';

  nameField = 'Shelby McCowan';
  emailField = 'itsme@shelbymccowan.com';
  schoolIDField = 'usu';
  passwordField = 'password';
  confirmPassField = 'password';

  constructor(public registerService: RegisterService) { }

  ngOnInit(): void {
  }

  sendRegister() {
    const newPerson = {
      name: this.nameField,
      email: this.emailField,
      schoolID: this.schoolIDField,
      password: this.passwordField,
      personType: 'student',
      profileURL: '',
      enrolledCourses: [],
      taughtCourses: [],
      bio: ''
    };

    this.registerService.sendRegistration(newPerson).subscribe((res: any) => {
      console.log(res);
    });
  }

}
