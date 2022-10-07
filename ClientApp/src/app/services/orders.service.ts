import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  _http: HttpClient;
  orders: any;

  constructor(_httpREF: HttpClient) {
    this._http = _httpREF;
  }
  getOrderDetails() {
    return this._http.get('https://localhost:7108/api/OrderDetails').subscribe(result => {
      this.orders = result;
      console.log(result);
    });
  }
}
