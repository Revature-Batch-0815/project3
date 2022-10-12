import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-services.service';
import { Product } from 'src/products.model';
import { SearchMessageService } from 'src/app/Services/search-message.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  Products: Product[] = [];

  message:string="";

  constructor(
    private service: AppServiceService,
    private seachmessage: SearchMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  enterSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();


  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enterSearchValue);
    this.getProductsBySearchTerm();
  }

  getProductsBySearchTerm() {
    this.seachmessage.changeMessage(this.enterSearchValue)
    this.service
      .searchProducts(this.enterSearchValue)
      .subscribe((data: Product[]) => {
        this.Products = data;
        console.log(data);
      });
  }
}
