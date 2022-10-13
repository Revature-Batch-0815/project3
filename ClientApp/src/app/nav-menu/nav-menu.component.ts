import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded = false;
  searchText: string = '';

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
