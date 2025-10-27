import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})

export class HomepageComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log(data);
        
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    })
  }
}
