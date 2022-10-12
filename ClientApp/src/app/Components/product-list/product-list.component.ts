import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/products.model';
import { AppServiceService } from '../../Services/app-services.service';
import { searchInputService } from 'src/app/Services/search-input.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];

  constructor(
    private productService: AppServiceService,
    private _searchInputService: searchInputService
  ) {
    _searchInputService.changeEmitted$.subscribe((text) => {
      console.log(text);
    });
  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((results: Product[]) => (this.Products = results));
  }
}
