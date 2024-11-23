import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { DefaultService, Product } from './modules/openapi';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'openapi-demo';
  products$!: Observable<Product[]>;

  constructor(private productService: DefaultService) {
  }

  ngOnInit() {
    this.products$ = this.productService.productsGet();
  }
}
