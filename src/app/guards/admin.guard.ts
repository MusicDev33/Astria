import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { JwtService } from '@services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  canActivate(): boolean {
    if (this.jwtService.tokenExpired()) {
      return false;
    }

    return true;
  }
}
