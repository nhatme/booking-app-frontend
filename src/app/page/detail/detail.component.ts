import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Booking, DataAPI } from '../home/api.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  product!: DataAPI;
  tourPrice: number = 0; // Tour price
  passengerCount: number = 1; // Number of passengers

  constructor(private route: ActivatedRoute, private readonly http: HttpClient, private cookieService: CookieService) { };

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(productId);
  }

  bookTour(): void {
    const newBooking: Booking = {
      id: this.product?.id.toString(),
      name: this.product?.name,
      price: this.product?.price,
      img: this.product?.image,
      address: this.product?.address,
      category: this.product?.category,
      passengerCount: this.passengerCount,
      tourStartDate: this.product?.duration,
      count: 1,
      selected: false
    };

    let bookings = [];

    const existingBookings = this.cookieService.get('bookings_vnb');
    if (existingBookings) {
      bookings = JSON.parse(existingBookings);
    }

    const existingBookingIndex = bookings.findIndex((booking: any) => booking.id === newBooking.id);
    if (existingBookingIndex !== -1) {
      bookings[existingBookingIndex].count++;
    } else {
      bookings.push(newBooking);
    }

    this.cookieService.set('bookings_vnb', JSON.stringify(bookings));
  }

  private fetchProduct(id: string | null): void {
    if (id) {
      this.http.get<DataAPI[]>(`http://localhost:3000/products?id=${id}`).subscribe(products => {
        this.product = products[0];
      })
    }
  }
}
