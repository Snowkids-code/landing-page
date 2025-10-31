import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../services/products.service';
import { GraphqlService } from '../services/graphql.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;
  characters: string[] = [];

  constructor(
    private productService: ProductsService,
    private graphqlService: GraphqlService
  ) {}

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
      },
    });

    this.graphqlService.getRickAndMortyData().subscribe({
      next: (data) => {
        this.characters = data.characters.results.map((r: any) => r.name);
      },
      error: (err) => {
        console.error('GraphQL fetch error:', err);
        this.error = 'Failed to load data.';
        this.loading = false;
      },
    });
  }
}
