import { Component, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  cartNo: number = 0;
  ngOnInit(): void {
    setInterval(() => { this.getCartNo() }, 250);
  }
  isExpanded = false;
  searchText: string = '';

  getCartNo() {
    let data: any = localStorage.getItem('Cart');
    if (JSON.parse(data) != null) {
      this.cartNo = JSON.parse(data).length;
    }
  }
  @Output()
  textChangeEmitter: EventEmitter<string> = new EventEmitter<string>();


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getSearchTermFromInput(searchValue: string) {
    this.searchText = searchValue;
    this.textChangeEmitter.emit(this.searchText);
  }
}
