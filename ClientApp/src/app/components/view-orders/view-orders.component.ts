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
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authorizeService: AuthorizeService) {
    http.get<Order[]>(baseUrl + 'api/Orders', { withCredentials: true}).subscribe(result => {
      this.orders = result;
    }, error => console.error(error));

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
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
