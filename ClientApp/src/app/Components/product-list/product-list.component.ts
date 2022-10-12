import { Component, OnInit, Inject, Input } from '@angular/core';
import { Product } from 'src/products.model';
import { AppServiceService } from '../../Services/app-services.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  Products: Product[] = [];

  @Input() searchTerm: string = '';
  constructor(private productService: AppServiceService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((results: Product[]) => (this.Products = results));
  }
}
