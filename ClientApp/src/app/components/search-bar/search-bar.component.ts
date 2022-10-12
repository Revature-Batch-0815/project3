import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/Services/app-services.service';
import { searchInputService } from 'src/app/Services/search-input.service';
import { Product } from 'src/products.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  Products: Product[] = [];

  constructor(
    private service: AppServiceService,
    private route: ActivatedRoute,
    private _searchInputService: searchInputService
  ) {}

  ngOnInit(): void {}

  enterSearchValue: string = '';

  @Output()
  textChangeEmitter: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged() {
    // this.textChangeEmitter.emit(this.enterSearchValue);
    this._searchInputService.emitChange(this.enterSearchValue);
    this.getProductsBySearchTerm();
  }

  getProductsBySearchTerm() {
    this.service
      .searchProducts(this.enterSearchValue)
      .subscribe((data: Product[]) => {
        this.Products = data;
        console.log(data);
      });
  }
}
