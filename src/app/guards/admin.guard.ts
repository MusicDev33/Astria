import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { JwtService } from '@services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  acceptedTypes = ['as-admin'];

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

    if (this.jwtService.tokenExpired() && !this.acceptedTypes.includes(decodedPerson.personType)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
