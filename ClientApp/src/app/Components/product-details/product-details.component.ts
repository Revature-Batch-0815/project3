import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/products.model';
import { AppServiceService } from 'src/app/Services/app-services.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private service: AppServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => this.getProductById(params['id']));
  }

  product: Product | undefined;

  getProductById(id: string) {
    this.service.getProductById(id).subscribe((data: Product) => this.product = data);
  }

  cart: string[] = [];
  addCart(thingy: string | undefined) {
    if (thingy == undefined) {
      return;
    }
    console.log(thingy);
    let data: any = localStorage.getItem('Cart');
    if (JSON.parse(data) != null) {
      this.cart = JSON.parse(data);
    }
    this.cart.push(thingy);
    console.log(this.cart);
    localStorage.setItem("Cart", JSON.stringify(this.cart));
  }
}
