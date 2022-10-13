import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchMessageService } from 'src/app/services/search-message.service';
import { AppServiceService } from '../services/app-services.service';
import { Product } from 'src/products.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(
    private service: AppServiceService,
    private _router: Router,
    private seachmessage: SearchMessageService
  ) {}

  enterSearchValue: string = '';
  Products: Product[] = [];

  getProductsBySearchTerm() {
    this.seachmessage.changeMessage(this.enterSearchValue.toLowerCase());
    this.service
      .searchProducts(this.enterSearchValue)
      .subscribe((data: Product[]) => {
        this.Products = data;
        console.log('from searchbar: ', data);
      });
  }
}
