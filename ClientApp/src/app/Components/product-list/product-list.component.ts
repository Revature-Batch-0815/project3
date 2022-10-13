import { Component, OnInit, Inject, Input } from '@angular/core';
import { Product } from 'src/products.model';
import { AppServiceService } from '../../services/app-services.service';
import { SearchMessageService } from 'src/app/services/search-message.service';

import { HttpClient } from '@angular/common/http';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];
  searchTerm: string = 'i';

  constructor(
    private productService: AppServiceService,
    private searchMessage: SearchMessageService
  ) {}

  ngOnInit(): void {
    this.searchMessage.currentMessage.subscribe((d) => (this.searchTerm = d));
    this.productService
      .searchProducts(this.searchTerm)
      .subscribe((results: Product[]) => {
        this.Products = results;
        console.log('from productList:', results);
        this.getAllProducts()
      });
      this.getAllProducts;
  }
  getAllProducts(){
      this.productService.getProducts().subscribe((results: Product[]) => {
        this.Products = results;
        console.log('from productList:', results);
    }
  }
}
