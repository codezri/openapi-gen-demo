import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultService, Product } from '../modules/openapi';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: DefaultService) {}

  getProducts(): Observable<Product[]> {
    return this.api.productsGet();
  }
}