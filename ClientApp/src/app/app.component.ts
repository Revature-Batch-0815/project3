import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'app';
  searchTerm: string = '';

  getSearchTermFromNav(searchValue: string) {
    this.searchTerm = searchValue;
  }
}
