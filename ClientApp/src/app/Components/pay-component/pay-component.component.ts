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
    /*any = [{
    productID: 10001,
    productName: "Samsung 70\" TV",
    productCategory: "Computers & Displays",
    productDesc: "(Sale) 70\" Smart 4K Crystal HDR UHD TV TU7000 Series",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_4e327478-bf8d-4c8f-a90a-7c561597896c?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "629.99",
    productQty: 3
  },

  {
    productID: 10002,
    productName: "VIZIO 50\" TV",
    productCategory: "Computers & Displays",
    productDesc: "(Sale) V-Series 50\" Class 4K HDR Smart TV - V505-J09",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_e0557f9f-879e-40ac-8b9a-29b44336717e?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "299.99",
    productQty: 2
  },

  {
    productID: 10003,
    productName: "LG 65\" OLED TV",
    productCategory: "Computers & Displays",
    productDesc: "65\" Class 4K UHD Smart OLED TV - OLED65B2PUA",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_5151b214-96cf-4184-bc77-d8a5d71875cd?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "1599.99",
    productQty: 1
  },

  {
    productID: 10004,
    productName: "TCL 50\" TV",
    productCategory: "Computers & Displays",
    productDesc: "50\" 4k UHD HDR Smart Roku TV - 50S455",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_bbed77ae-63c0-47b0-90ae-355015af0526?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "299.99",
    productQty: 4
  },

  {
    productID: 10005,
    productName: "HP Windows Touchscreen Laptop",
    productCategory: "Computers & Displays",
    ProductDesc: "HP 15.6\" screen, S mode - AMD Ryzen 3 Processor - 4GB RAM Memory - 256GB SSD Storage - Silver (15-ef1041nr)",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_18f7d923-d039-482b-8453-8f7bc4c92eb7?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "499.99",
    productQty: 12
  },

  {
    productID: 10006,
    productName: "Acer Aspire 3 Windows Laptop",
    productCategory: "Computers & Displays",
    productDesc: "15.6\" Laptop Intel Core i5-1035G1 1GHz 8GB Ram 256GB SSD Windows 10 Home - Manufacturer Refurbished",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_c47a3d6d-89aa-4929-91eb-17e84dc587c0?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "399.99",
    productQty: 4
  }];*/


  data: any = localStorage.getItem('Cart');
  dataSource = JSON.parse(this.data);
  //stepper stuff
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private _formBuilder: FormBuilder, private service: AppServiceService, private route: ActivatedRoute) { }
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
    for (let x in this.cart2) {
      this.subtotal += parseFloat(this.cart2[x].productPrice);
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
      console.log(this.subtotal);
    }
  }

  clearCart() {
    localStorage.clear();
    this.router.navigate(['/paySuccess']);
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


