import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  saveData() {
    let data = { productId: 10 }
    localStorage.setItem('cookie', JSON.stringify(data));
  }

  loadData() {
    let data = localStorage.getItem('cookie');
    alert(data);


  }
}
