import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { DataAPI } from './api.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  public products: DataAPI[] = [];
  public paginatedProducts: DataAPI[] = [];
  public totalItems: number = 0;
  public pageSize: number = 4;
  public currentPage: number = 0;

  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  public pageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProducts();
  }

  private fetchProducts(): void {
    this.http.get<DataAPI[]>("http://localhost:3000/products").subscribe(products => {
      this.products = products;
      this.totalItems = products.length;
      this.updatePaginatedProducts();
    });
  }

  private updatePaginatedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

}
