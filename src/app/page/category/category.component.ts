import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { DataAPI } from '../home/api.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, MatPaginatorModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})

export class CategoryComponent implements OnInit {
  public products: DataAPI[] = [];
  public filteredProducts: DataAPI[] = [];
  public paginatedProducts: DataAPI[] = [];
  public totalItems: number = 0;
  public pageSize: number = 8;
  public currentPage: number = 0;
  private searchQuery: string = '';
  private selectedregion: string = '';
  private sortOrder: string = '';

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
      // this.totalItems = products.length;
      // this.updatePaginatedProducts();
      this.applyFilters();
    });
  }

  private applyFilters(): void {
    this.filteredProducts = this.products;

    if (this.selectedregion) {
      this.filteredProducts = this.filteredProducts.filter(product => product.category.toLowerCase().includes(this.selectedregion.toLowerCase()));
    }
    if (this.searchQuery) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    if (this.sortOrder) {
      this.filteredProducts = this.filteredProducts.sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }
    this.totalItems = this.filteredProducts.length;
    this.updatePaginatedProducts();
  }

  private updatePaginatedProducts(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  public filterRegion(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedregion = selectElement.value;
    this.applyFilters();
  }

  public sortByPrice(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOrder = selectElement.value;
    this.applyFilters();
  }
  public searchProduct(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
    this.applyFilters();
  }
}
