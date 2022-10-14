import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-services.service';
import { Product } from 'src/products.model';
import { SearchMessageService } from 'src/app/services/search-message.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  Products: Product[] = [];

  message: string = '';

  constructor(
    private service: AppServiceService,
    private seachmessage: SearchMessageService,
    private route: ActivatedRoute,
    private location: Location,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  enterSearchValue: string = '';

  @Output()
  textChangeEmitter: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    this.textChangeEmitter.emit(this.enterSearchValue);
    this.getProductsBySearchTerm();
  }

  redirectOnEnter() {
    this._router.navigateByUrl('/product');
  }

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
