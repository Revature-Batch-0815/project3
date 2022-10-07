import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  _makeApiCall: OrdersService;

  constructor(_apicallREF: OrdersService) {
    this._makeApiCall = _apicallREF;
  }

  ngOnInit(): void {
  }

}
