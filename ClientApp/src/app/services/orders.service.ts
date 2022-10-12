import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../order.model';

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
    return this._http.get('https://localhost:7108/api/Orders').subscribe(result => {
      this.orders = result;
      console.log(result);
    });
  }

  //Posting an order to the database
  public addOrder(addOrder: Order): Observable<Order> {
    return this._http.post<Order>('https://localhost:7108/api/Orders/', addOrder);
  }

 


  /**
   * getOrdersById
   */
  public getOrderById(id: string): Observable<Order> {
    return this._http.get<Order>(`https://localhost:7108/api/Orders/${id}`);
  }

  /**
   * updateOrder
   */
  public updateOrder(id: string, updateProduct: Order): Observable<Order> {
    return this._http.put<Order>(`https://localhost:7108/api/Orders/${id}`, updateProduct)
  }

  /**
   * deleteOrder
   */
  public deleteOrder(id: string): Observable<Order> {
    return this._http.delete<Order>(`https://localhost:7108/api/Orders/${id}`)
  }
}
