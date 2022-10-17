import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
    private searchmessage: SearchMessageService
  ) {}

  Products: Product[] = [];

  getProductsByDisplayCategory(categoryTerm: string) {
    this._router.navigateByUrl('/product');
    this.searchmessage.changeMessage(categoryTerm);
    this.service.searchProducts(categoryTerm).subscribe((data: Product[]) => {
      this.Products = data;
      console.log('from homepage: ', data);
    });
  }

  redirect(id: number) {
    this._router.navigateByUrl(`pdetails/${id}`);
  }
}
