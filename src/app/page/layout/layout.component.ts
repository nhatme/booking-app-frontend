import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;
  totalCount: number = 0;
  constructor(private readonly authService: AuthService, private readonly cookieService: CookieService) { }
  ngOnInit(): void {
    this.checkLoginStatus();
    this.updateCartCount();
  }

  updateCartCount(): void {
    const existingBookings = this.cookieService.get('bookings_vnb');
    if (existingBookings) {
      const bookings = JSON.parse(existingBookings);
      this.totalCount = bookings.length;
    } else {
      this.totalCount = 0;
    }
  }

  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.checkLoginStatus(); // Update the login status
    this.closeModal();
  }

  openModal(): void {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('profileModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
