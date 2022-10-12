import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from '../../../products.model';
import { AppServiceService } from 'src/app/Services/app-services.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { map, Observable } from 'rxjs';
import { first } from 'rxjs';

/*
 * Notes:
 * -- Connect to the services - H.
 * -- Delete cart on buy
 * 
 */

export interface product {
  productID: number,
  productName: string,
  productCategory: string,
  productDesc: string,
  productImgUrl: string,
  productPrice: string,
  productQty: number
}



@Component({
  selector: 'app-pay-component',
  templateUrl: './pay-component.component.html',
  styleUrls: ['./pay-component.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})

export class PayComponentComponent implements OnInit {

  cart2: any = [];
  cartNum: any = [];
  cart: string[] = ['11','41','42','124','126','51'];
  

  data: any = localStorage.getItem('Cart');
  dataSource = JSON.parse(this.data);
  //stepper stuff
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder, private service: AppServiceService, private route: ActivatedRoute, private router: Router, private orderService: OrdersService, private authorizeService: AuthorizeService) { }
  @ViewChild('paypalRef', { static: true })
  private paypalRef!: ElementRef;
  userID?: any;
  actualID: any = "";


  //ON INIT HERE

  ngOnInit(): void {
    this.addCart();
    this.showCart();
    this.authorizeService.getUser().subscribe(users => { this.userID = users; });
    (async () => {
      await delay(3000);
      this.updateSubtotal();
    })();
    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*(async () => {
      await delay(2000);
      console.log(this.userID.sub);
    })();*/


  data: any = localStorage.getItem('Cart');
  dataSource = JSON.parse(this.data);

    /* aaron's paypal stuff
     * window.paypal.Buttons(
      {
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data:any , actions:any) => {
          return actions.order.create({
            purchase_units: [
              {

                amount: {
                  value: this.subtotal.toFixed(2),
                  currency_code: 'USD'
                }
              }
            ]
          });
        },
        onApprove: function (data: any, actions: any) {
          // This function captures the funds from the transaction.
          
          localStorage.clear();
          //go to a new page
          console.log("a");
          this.router.navigate(['/product']);
          console.log("b");

          //that page goes to the home page
         // return actions.order.capture().then(function (details:any) {
            // This function shows a transaction success message to your buyer.
            //alert('Transaction completed by ' + details.payer.name.given_name);
          //});
        }
      }
    ).render(this.paypalRef.nativeElement);*/
  }

  //END OF ONINIT
  addCart() {
    localStorage.setItem("Cart", JSON.stringify(this.cart));
  }
  subtotal = 0;

  showCart() {
    console.log("it works");
    let data: any = localStorage.getItem('Cart');
    this.cartNum = JSON.parse(data);
    for (let x in this.cartNum) {
      this.getProductById(this.cartNum[x]);
    }
  }

  updateSubtotal() {
    for (let x in this.cart2) {
      this.subtotal += parseFloat(this.cart2[x].productPrice);
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
      console.log(this.subtotal);
    }
  }

  clearCart() {
    localStorage.clear();
    this.router.navigate(['/product']);
    //this.router.navigate(['/paySuccess']); <--Not sure which one is correct so left this here as comment if an error occurs from using /product above -jacob
  }
  product: Product | undefined;

  getProductById(id: string) {
    this.service.getProductById(id).subscribe((data: Product) => this.cart2.push(data));
  }

  postToOrders(order: any) {
    this.orderService.addOrder(order);
  }

  confirmCheckout() {
    console.log('post request to orders for $', this.subtotal, 'from ', this.authorizeService.getUser().pipe(map(u => u && u.name)));
    var theOrder;
    var items: any = [];
    var shoppingCart: string = this.cart2;
    items[0] = this.subtotal;
    items[1] = this.userID.sub;
    items[2] = shoppingCart;
    //theOrder.put("orderAmount", this.subtotal);
    var fakeOrder = [
      {
        "productId": 42,
        "orderAmount": 299.99,
        "orderQty": 1,
        "orderStatus": "Received"
      }

    ];
    items[3] = fakeOrder;
    theOrder = {
      "orderAmount": items[0],
      "userId": items[1],
      "orderDetails": items[3]
    }
    console.log(JSON.stringify(theOrder));
    this.postToOrders(items);
/*    export class Order {
      orderAmount = "";
      userId = "";
      orderDetails = [];
    }
*/

    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    (async () => {
      await delay(2000);
      this.clearCart();
    })();

   
  }

}


