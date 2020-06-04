import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JwtService } from '@services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorGuard implements CanActivate {

  acceptedTypes = ['instructor', 'mt-admin'];

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const decodedPerson = this.jwtService.decodeCookieByName('jwt');
    if (!decodedPerson) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (this.jwtService.tokenExpired() || !this.acceptedTypes.includes(decodedPerson.personType)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
