import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  saveData() {
    let data = { productId: 10 }
    localStorage.setItem('cookie', JSON.stringify(data));
  }

  loadData() {
    let data = localStorage.getItem('cookie');
    alert(data);
  }
  constructor() { }
}
