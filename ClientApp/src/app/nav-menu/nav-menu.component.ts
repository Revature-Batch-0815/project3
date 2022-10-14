
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit {
  cartNo: number = 0;
  ngOnInit(): void {
    setInterval(() => { this.getCartNo() }, 1000);
  }
  isExpanded = false;
  searchText: string = '';

  getCartNo() {
    let data: any = localStorage.getItem('Cart');
    if (JSON.parse(data) != null) {
      this.cartNo = JSON.parse(data).length;
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText);
  }
}
