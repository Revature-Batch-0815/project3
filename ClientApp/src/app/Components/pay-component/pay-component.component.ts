import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Product } from '../../../products.model';

export interface product {
  productID: number,
  productName: string,
  productCategory: string,
  productDesc: string,
  productImgUrl: string,
  productPrice: string,
  productQty: number
}

const ELEMENT_DATA: product[] = [
  {
    productID: 10001,
    productName: "Samsung 70\" TV",
    productCategory: "Computers & Displays",
    productDesc: "(Sale) 70\" Smart 4K Crystal HDR UHD TV TU7000 Series",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_4e327478-bf8d-4c8f-a90a-7c561597896c?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$629.99",
    productQty: 3
  },

  {
    productID: 10002,
    productName: "VIZIO 50\" TV",
    productCategory: "Computers & Displays",
    productDesc: "(Sale) V-Series 50\" Class 4K HDR Smart TV - V505-J09",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_e0557f9f-879e-40ac-8b9a-29b44336717e?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$299.99",
    productQty: 2
  },

  {
    productID: 10003,
    productName: "LG 65\" OLED TV",
    productCategory: "Computers & Displays",
    productDesc: "65\" Class 4K UHD Smart OLED TV - OLED65B2PUA",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_5151b214-96cf-4184-bc77-d8a5d71875cd?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$1,599.99",
    productQty: 1
  },

  {
    productID: 10004,
    productName: "TCL 50\" TV",
    productCategory: "Computers & Displays",
    productDesc: "50\" 4k UHD HDR Smart Roku TV - 50S455",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_bbed77ae-63c0-47b0-90ae-355015af0526?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$299.99",
    productQty: 4
  },

  {
    productID: 10005,
    productName: "HP Windows Touchscreen Laptop",
    productCategory: "Computers & Displays",
    productDesc: "HP 15.6 screen",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_18f7d923-d039-482b-8453-8f7bc4c92eb7?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$499.99",
    productQty: 12
  },

  {
    productID: 10006,
    productName: "Acer Aspire 3 Windows Laptop",
    productCategory: "Computers & Displays",
    productDesc: "15.6\" Laptop Intel Core i5-1035G1 1GHz 8GB Ram 256GB SSD Windows 10 Home - Manufacturer Refurbished",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_c47a3d6d-89aa-4929-91eb-17e84dc587c0?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$399.99",
    productQty: 4
  }

];

@Component({
  selector: 'app-pay-component',
  templateUrl: './pay-component.component.html',
  styleUrls: ['./pay-component.component.css']
})

export class PayComponentComponent implements OnInit {

  cart2: any = [];

  cart: any = [{
    productID: 10001,
    productName: "Samsung 70\" TV",
    productCategory: "Computers & Displays",
    productDesc: "(Sale) 70\" Smart 4K Crystal HDR UHD TV TU7000 Series",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_4e327478-bf8d-4c8f-a90a-7c561597896c?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$629.99",
    productQty: 3
  },

  {
    productID: 10002,
    productName: "VIZIO 50\" TV",
    productCategory: "Computers & Displays",
    productDesc: "(Sale) V-Series 50\" Class 4K HDR Smart TV - V505-J09",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_e0557f9f-879e-40ac-8b9a-29b44336717e?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$299.99",
    productQty: 2
  },

  {
    productID: 10003,
    productName: "LG 65\" OLED TV",
    productCategory: "Computers & Displays",
    productDesc: "65\" Class 4K UHD Smart OLED TV - OLED65B2PUA",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_5151b214-96cf-4184-bc77-d8a5d71875cd?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$1,599.99",
    productQty: 1
  },

  {
    productID: 10004,
    productName: "TCL 50\" TV",
    productCategory: "Computers & Displays",
    productDesc: "50\" 4k UHD HDR Smart Roku TV - 50S455",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_bbed77ae-63c0-47b0-90ae-355015af0526?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$299.99",
    productQty: 4
  },

  {
    productID: 10005,
    productName: "HP Windows Touchscreen Laptop",
    productCategory: "Computers & Displays",
    ProductDesc: "HP 15.6\" screen, S mode - AMD Ryzen 3 Processor - 4GB RAM Memory - 256GB SSD Storage - Silver (15-ef1041nr)",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_18f7d923-d039-482b-8453-8f7bc4c92eb7?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$499.99",
    productQty: 12
  },

  {
    productID: 10006,
    productName: "Acer Aspire 3 Windows Laptop",
    productCategory: "Computers & Displays",
    productDesc: "15.6\" Laptop Intel Core i5-1035G1 1GHz 8GB Ram 256GB SSD Windows 10 Home - Manufacturer Refurbished",
    productImgUrl: "https://target.scene7.com/is/image/Target/GUEST_c47a3d6d-89aa-4929-91eb-17e84dc587c0?qlt=85&fmt=webp&hei=325&wid=325",
    productPrice: "$399.99",
    productQty: 4
  }];

  columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: product) => `${element.productID}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: product) => `${element.productName}`,
    },
    {
      columnDef: 'category',
      header: 'Category',
      cell: (element: product) => `${element.productCategory}`,
    },
    {
      columnDef: 'description',
      header: 'Description',
      cell: (element: product) => `${element.productDesc}`,
    },
    {
      columnDef: 'imageurl',
      header: 'Image URL',
      cell: (element: product) => `${element.productImgUrl}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: product) => `${element.productPrice}`,
    },
    {
      columnDef: 'quantity',
      header: 'Quantity',
      cell: (element: product) => `${element.productQty}`,
    },
  ];
  data: string = localStorage.getItem('Cart');
  dataSource = JSON.parse(this.data);
  displayedColumns = this.columns.map(c => c.columnDef);

  constructor() { }
  @ViewChild('paypalRef', { static: true })
  private paypalRef!: ElementRef;
  ngOnInit(): void {
    //let data: any = localStorage.getItem('Cart');
    //this.cart2 = JSON.parse(data);
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

  addCart() {
    localStorage.setItem("Cart", JSON.stringify(this.cart));
  }

  showCart() {
    let data: any = localStorage.getItem('Cart');
    this.cart2 = JSON.parse(data);
  }


}

//export class TableGeneratedColumnsExample {
//  columns = [
//    {
//      columnDef: 'id',
//      header: 'ID',
//      cell: (element: product) => `${element.productID}`,
//    },
//    {
//      columnDef: 'name',
//      header: 'Name',
//      cell: (element: product) => `${element.productName}`,
//    },
//    {
//      columnDef: 'category',
//      header: 'Category',
//      cell: (element: product) => `${element.productCategory}`,
//    },
//    {
//      columnDef: 'description',
//      header: 'Description',
//      cell: (element: product) => `${element.productDesc}`,
//    },
//    {
//      columnDef: 'imageurl',
//      header: 'Image URL',
//      cell: (element: product) => `${element.productImgUrl}`,
//    },
//    {
//      columnDef: 'price',
//      header: 'Price',
//      cell: (element: product) => `${element.productPrice}`,
//    },
//    {
//      columnDef: 'quantity',
//      header: 'Quantity',
//      cell: (element: product) => `${element.productQty}`,
//    },
//  ];
//  dataSource = localStorage.getItem('Cart');
//  displayedColumns = this.columns.map(c => c.columnDef);
//}
