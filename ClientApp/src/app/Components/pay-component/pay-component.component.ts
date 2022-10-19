import { Component, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from '../../../products.model';
import { AppServiceService } from 'src/app/Services/app-services.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { map, Observable } from 'rxjs';
import { first } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../../order.model';
import { OrdersService } from 'src/app/Services/orders.service';
//import { MatButtonModule } from '@angular/material/button';



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
  paymentHandler: any = null;
  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;

  cart2: any = [];
  cartNum: any = [];
  cart: string[] = ['11', '41', '42', '124', '126', '51'];


  data: any = localStorage.getItem('Cart');
  dataSource = JSON.parse(this.data);
  //stepper stuff
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private http: HttpClient, private _formBuilder: FormBuilder, private service: AppServiceService, private route: ActivatedRoute, private router: Router, private orderService: OrdersService, private authorizeService: AuthorizeService) { }
  @ViewChild('paypalRef', { static: true })
  private paypalRef!: ElementRef;
  userID?: any;
  store: string = "";
  count: number = 0;

  //ON INIT HERE

  ngOnInit(): void {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name));
    if (this.userName) {
      console.log("You're authorized");

      console.log(this.userName);
    } else {
      console.log("not authorized");
    }
    //this.addCart(); //for testing
    this.showCart();
    this.invokeStripe();


    this.count = 0;
    this.authorizeService.getUser().subscribe(users => { this.userID = users; });
    (async () => {
      await this.delay(2000);
      console.log(this.userID.sub);
    })();
   
  




    /*this.authorizeService.getUser().subscribe(users => { this.userID = users; });
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

    //data: any = localStorage.getItem('Cart');
    //dataSource = JSON.parse(this.data);*/


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
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  showCart() {
    this.cart2 = [];
    let data: any = localStorage.getItem('Cart');
    this.cartNum = JSON.parse(data);
    for (let x in this.cartNum) {
      this.getProductById(this.cartNum[x]);
    }
    console.log(this.cart2);
    (async () => {
      await this.delay(150);
      this.updateSubtotal();
    })();
  }

  updateSubtotal() {
    this.subtotal = 0;
    for (let x in this.cart2) {
      this.subtotal += parseFloat(this.cart2[x].productPrice);
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
    }
    (async () => {
      await this.delay(1000);
      console.log("refresh");
      this.count++;
      if (this.count < 10) {
        this.updateSubtotal();
      }
    })();

  }

  clearCart() {
    localStorage.clear();

    //document.location.reload();
    //this.router.navigate(['/product']);

    //this.router.navigate(['/paySuccess']); <--Not sure which one is correct so left this here as comment if an error occurs from using /product above -jacob
  }
  product: Product | undefined;

  getProductById(id: string) {
    this.service.getProductById(id).subscribe((data: Product) => this.cart2.push(data));
  }

  postToOrders(order: any) {
    this.orderService.addOrder(order);
  }
  temp: any = [];
  lock: boolean = false;
  removeItem(thingy: string) {
    this.temp = [];
    this.count = 0;
    console.log(thingy);
    this.lock = false;
    for (let x in this.cartNum) {
      if (this.cartNum[x] != thingy || this.lock == true) {
        this.temp.push(this.cartNum[x]);
      }
      else {
        this.lock = true;
      }
    }
    this.cartNum = this.temp;
    console.log(this.cartNum);
    localStorage.setItem("Cart", JSON.stringify(this.cartNum));
    this.showCart();
  }
  fakeOrderTemplate: any = 
    {
      "productId": 0,
      "orderAmount": 0,
      "orderQty": 0,
      "orderStatus": ""
    };
  fakeOrder: any = [];
  getOrder() {
    this.fakeOrder = [];
    for (let x in this.cart2) {
      //this.fakeOrder.push(this.fakeOrderTemplate.slice(0));
      this.fakeOrder.push(JSON.parse(JSON.stringify(this.fakeOrderTemplate)));
  
      this.fakeOrder[x].productId = this.cart2[x].productId;
      this.fakeOrder[x].orderAmount = this.cart2[x].productPrice;
      this.fakeOrder[x].orderQty = 1;
      this.fakeOrder[x].orderStatus = 'Received';
    }
    this.fakeOrder = this.fakeOrder.flat(1);
    console.log(this.fakeOrder);
    return this.fakeOrder;
  }

  confirmCheckout() {
    (async () => {
      
      await this.delay(1000);
      this.getOrder();
      var items: any = [];
      items[0] = this.subtotal;
      items[1] = this.userID.sub;
      //items[1] = "666fbab1-d1e0-413f-9e60-808a3b563c86";
     
      var theOrder = {
        "orderAmount": items[0],
        "userId": items[1],
        "orderDetails": this.getOrder()
      }
      console.log(JSON.stringify(theOrder));
      this.http.post<Order>('https://localhost:7108/api/Orders/', theOrder).subscribe(response => console.log(response));
      alert("Order Confirmed!");
      this.clearCart();
    })();


    /*James Stripe*/


    /*end of Stripe*/

    /*
     *[3799.95, '666fbab1-d1e0-413f-9e60-808a3b563c86', Array(6)]
     * 
    console.log('post request to orders for $', this.subtotal, 'from ', this.authorizeService.getUser().pipe(map(u => u && u.name)));
    var theOrder;
    var items: any = [];
    var shoppingCart: any =  JSON.parse(this.cart2);
    items[0] = this.subtotal;
    //items[1] = this.userID.sub;
    items[1] = "666fbab1-d1e0-413f-9e60-808a3b563c86";
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
    //take cart and turn it into a regular array
    var orderPost: any = [];
    //for each item in cart 2
    for (var item in this.cart2) {
      fakeOrder[0].productId = this.cart2[item].productId;
      fakeOrder[0].orderAmount = this.cart2[item].productPrice;
      orderPost[item] += fakeOrder;
    }
    console.log(fakeOrder);

   
    items[3] = fakeOrder;
    theOrder = {
      "orderAmount": items[0],
      "userId": items[1],
      "orderDetails": items[3]
    }
    console.log(JSON.stringify(theOrder));
    this.http.post<Order>('https://localhost:7108/api/Orders', theOrder).subscribe(x => console.log(x));

  

    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    (async () => {
      await delay(2000);
      this.clearCart();
    })();*/


  }



  /*stripe*/
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Kwb7DKm59JFxKrhqI64VAWI7H4xBB6qLQ2eqAdDKHrFAQQp26vP66WAc6NmYnZTYL0enYwa3bZLuyiROSiNPmVN00QiZC9vLe',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Payment Status: Success!');
      },
    });
    paymentHandler.open({
      name: 'revvTech',
      description: 'Your Purchase',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Kwb7DKm59JFxKrhqI64VAWI7H4xBB6qLQ2eqAdDKHrFAQQp26vP66WAc6NmYnZTYL0enYwa3bZLuyiROSiNPmVN00QiZC9vLe',
          locale: 'auto',
          token: function (stripeToken: any) {
          console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
  /*end of stripe*/





