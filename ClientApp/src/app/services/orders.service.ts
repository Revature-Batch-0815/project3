import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  _http: HttpClient;
  orders: any;

  constructor(_httpREF: HttpClient) {
    this._http = _httpREF;
  }
      this.orders = result;
      console.log(result);
    });
  }
}
