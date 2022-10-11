import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;

  public orders: Order[] = [];
  /**
   * Below is a sample of fake order details to play with in case you do not have an order
   * registered to your account.
   * These objects are meant ONLY for testing.
   */
  /*public orders: Order[] = [{
    "ordersId": 5,
    "orderDate": "2021-11-16 14:17:06",
    "orderAmount": 85,
    "userId": 90,
    "productId": 54,
    "orderId": 76
  }, {
    "ordersId": 4,
    "orderDate": "2022-02-19 16:41:30",
    "orderAmount": 14,
    "userId": 90,
    "productId": 83,
    "orderId": 79
  }, {
    "ordersId": 3,
    "orderDate": "2022-01-15 16:16:21",
    "orderAmount": 76,
    "userId": 27,
    "productId": 38,
    "orderId": 63
  }, {
    "ordersId": 4,
    "orderDate": "2022-02-05 09:34:10",
    "orderAmount": 13,
    "userId": 7,
    "productId": 60,
    "orderId": 44
  }, {
    "ordersId": 5,
    "orderDate": "2022-07-22 13:48:58",
    "orderAmount": 42,
    "userId": 15,
    "productId": 17,
    "orderId": 67
  }]
;*/


  //The Code Below was commented out and replaced with Jacob's code from his branch.
  //_makeApiCall: OrdersService;
  /*constructor(_apicallREF: OrdersService) {
    this._makeApiCall = _apicallREF;
  }
*/

  //Below is the code from Jacob's order-details-jacob branch. A huge thanks goes out to him. 
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authorizeService: AuthorizeService) {
    //baseUrl = baseUrl.split(":")[0] + ":" + baseUrl.split(":")[1] + ":7108/";
    http.get<Order[]>(baseUrl + 'api/Orders', { withCredentials: true }).subscribe(result => {
      this.orders = result;
    }, error => console.error(error));
  }

  
  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

}
interface Order {
  ordersId: number;
  orderDate: string;
  orderAmount: number;
  userId: number;
  productId: number;
  orderId: number;
}
