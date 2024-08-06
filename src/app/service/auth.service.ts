import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly cookieService: CookieService) { }

  isLoggedIn(): boolean {
    return this.cookieService.check('user_id_vnb') && this.cookieService.check('username_vnb');
  }

  getUsername(): string | null {
    return this.cookieService.get('username_vnb') || null;
  }

  logout(): void {
    this.cookieService.delete('user_id_vnb');
    this.cookieService.delete('username_vnb');
  }
}
