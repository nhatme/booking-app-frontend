import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Booking } from '../home/api.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  bookings: Booking[] = [];
  totalAmount: number = 0;
  constructor(private readonly cookieService: CookieService) { }
  ngOnInit(): void {
    this.loadBookings();
    this.updateTotal();
  }

  loadBookings(): void {
    const existingBookings = this.cookieService.get('bookings_vnb');
    if (existingBookings) {
      this.bookings = JSON.parse(existingBookings);
    }
  }

  incrementCount(index: number): void {
    this.bookings[index].count++;
    this.updateCookieAndTotal();
  }

  decrementCount(index: number): void {
    if (this.bookings[index].count > 1) {
      this.bookings[index].count--;
      this.updateCookieAndTotal();
    }
  }

  removeBooking(index: number): void {
    this.bookings.splice(index, 1);
    this.updateCookieAndTotal();
  }


  updateCookieAndTotal(): void {
    this.cookieService.set('bookings_vnb', JSON.stringify(this.bookings));
    this.updateTotal();
  }

  updateTotal(): void {
    this.totalAmount = this.bookings
      .filter(booking => booking.selected)
      .reduce((acc, booking) => acc + booking.price * booking.count, 0);
  }

  hasSelectedBookings(): boolean {
    return this.bookings.some(booking => booking.selected);
  }

  proceedToPay(): void {
    if (this.hasSelectedBookings()) {
      // Implement the payment process here
      alert('Proceeding to payment...');
    } else {
      alert('Please select at least one booking to proceed.');
    }
  }


}
