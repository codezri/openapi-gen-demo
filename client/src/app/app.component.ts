import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService, Product } from './modules/openapi';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'openapi-demo';
  products$!: Observable<Product[]>;
  productName!: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getProducts();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId)
      .subscribe(() => this.loadProducts())
  }

  createProduct() {
    this.productService.createProduct({name: this.productName})
      .subscribe(() =>  {
        this.productName = '';
        this.loadProducts();
      })
  }
}
