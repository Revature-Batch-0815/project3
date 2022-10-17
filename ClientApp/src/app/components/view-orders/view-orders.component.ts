import { Component, OnInit, Inject } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;

  public orders: Order[] = [];

  //_makeApiCall: OrdersService;

  //constructor(private authorizeService: AuthorizeService) {
  //  this._makeApiCall = _apicallREF;
  //}
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authorizeService: AuthorizeService) {
    http.get<Order[]>(baseUrl + 'api/Orders', { withCredentials: true }).subscribe(result => {
      this.orders = this.normalizeOrders(result);
      console.log(this.normalizeOrders(result));
    }, error => console.error(error));
  }

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  normalizeOrders(test: any[]) {
    let temp = -1;
    for (let x = 0; x < test.length; x++) {
      if (x > 0) {
        if (test[x].orderId == test[x - 1].orderId || test[x].orderId == temp) {
          temp = test[x - 1].orderId;
          test[x].orderId = null;
          test[x].orderDate = "";
          test[x].orderAmount = null;
          test[x].orderStatus = "";
        }
      }
    }
    return test;
  }

}



interface Order {
  orderAmount: number,
  orderDate: string,
  orderDetails: string,
  orderId: number,
  orderStatus: string,
  productDescription: string,
  productId: number,
  productName: string,
  productPrice: number,
  userId: string
}
