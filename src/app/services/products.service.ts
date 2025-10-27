import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  title: string;
  description?: string;
  images: string[];
  category?: string[];
  size?: string[];
  color?: string[];
  price: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:500/api/products';

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/`)
  } 
}
