import { Component, OnInit, Inject } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';
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

  template: any = {
    "orderAmount": null,
    "orderDate": "",
    "orderDetails": "",
    "orderId": null,
    "orderStatus": "",
    "productDescription": "",
    "productId": null,
    "productName": "",
    "productPrice": null,
    "userId": ""
  }


  paddingAmount: number = 4;
  normalizeOrders(test: any[]) {
    test = test.reverse();
    let ret: any[] = [];
    let temp = -1;
    for (let x = 0; x < test.length; x++) {
      if (x > 0) {
        if (test[x].orderId == test[x - 1].orderId || test[x].orderId == temp) {
          if (test[x - 1].orderId != null) {
            temp = test[x - 1].orderId;
          }
          test[x].orderId = null;
          test[x].orderDate = "";
          test[x].orderAmount = null;
          test[x].orderStatus = "";
          ret.push(test[x]);
        }
        else {
          if (x > 1) {
            for (let i = 0; i < this.paddingAmount; i++) {
              ret.push(JSON.parse(JSON.stringify(this.template)));
            }
          }
          ret.push(test[x]);
        }
      }
      else {
        ret.push(test[x]);
      }
    }
    return ret;
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
