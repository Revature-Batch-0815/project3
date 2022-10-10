import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-pay-component',
  templateUrl: './pay-component.component.html',
  styleUrls: ['./pay-component.component.css']
})
export class PayComponentComponent implements OnInit {

  constructor() { }
  @ViewChild('paypalRef', { static: true })
    private paypalRef!: ElementRef;
  ngOnInit(): void {
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: string; currency_code: string; }; }[]; }) => any; }; }) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '1000',
                  currency_code: 'USD'
                }
              }
            ]
          });
        }
      }
    ).render(this.paypalRef.nativeElement);
  }

}
