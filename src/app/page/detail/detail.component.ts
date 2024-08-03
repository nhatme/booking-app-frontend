import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataAPI } from '../home/api.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  public product: DataAPI | undefined;
  constructor(private route: ActivatedRoute, private readonly http: HttpClient) { };
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.fetchProduct(productId);
  }
  private fetchProduct(id: string | null): void {
    if (id) {
      this.http.get<DataAPI[]>(`http://localhost:3000/products?id=${id}`).subscribe(products => {
        this.product = products[0];
      })
    }
  }
}
