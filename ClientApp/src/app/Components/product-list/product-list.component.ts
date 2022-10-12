import { Component, OnInit, Inject, Input } from '@angular/core';
import { Product } from 'src/products.model';
import { AppServiceService } from '../../services/app-services.service';
import { SearchMessageService } from 'src/app/Services/search-message.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];
  searchTerm: string = "i";

  constructor(private productService: AppServiceService, private searchMessage: SearchMessageService) {}

  ngOnInit(): void {
    this.searchMessage.changeMessage(this.searchTerm)
    this.searchMessage.currentMessage.subscribe(d =>
      this.searchTerm = d)
    this.productService
      .searchProducts(this.searchTerm)
      .subscribe((results: Product[]) => (this.Products = results));
  }
}
