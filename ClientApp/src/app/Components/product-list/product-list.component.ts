import { Component, OnInit } from '@angular/core';
import { Product } from 'src/products.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: typeof Product[] = [
    {
      productId: "1",
      productName: "Les hautes solitudes",
      productCategory: "",
      productDescription: "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.",
      productImgUrl: "http://dummyimage.com/100x100.png/cc0000/ffffff",
      productPrice: "$79.69",
      productQty: "49"
    },
    {
      productId: "2",
      productName: "Bohème, La",
      productCategory: "Drama|Romance",
      productDescription: "Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
      productImgUrl: "http://dummyimage.com/100x100.png/dddddd/000000",
      productPrice: "$60.14",
      productQty: "16"
    },
    {
      productId: "3",
      "productName": "Garden of Eden, The", "productCategory": "Drama", "productDescription": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.", "productImgUrl": "http://dummyimage.com/100x100.png/ff4444/ffffff", "productPrice": "$47.53",
      "productQty": "3"
    },
    {
      productId: "4",
      "productName": "Prairie Love",
      "productCategory": "Comedy|Drama",
      "productDescription": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.",
      "productImgUrl": "http://dummyimage.com/100x100.png/ff4444/ffffff",
      "productPrice": "$56.94",
      "productQty": "83"
    },
    {
      productId: "5",
      "productName": "Manhattan Baby",
      "productCategory": "Horror",
      "productDescription": "Integer ac leo.",
      "productImgUrl": "http://dummyimage.com/100x100.png/dddddd/000000",
      "productPrice": "$65.40",
      "productQty": "83"
    }
  ]
  constructor() { }
  p = this.Products;
  ngOnInit(): void {
  }

}
