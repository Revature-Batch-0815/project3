import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppServiceService } from '../services/app-services.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId: any;
  productDetails: any;
  editProductForm: FormGroup = new FormGroup({});
  dataLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private service: AppServiceService, private formBuilder: FormBuilder, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe(data => {
      this.productId = data['id'];
    });

    if (this.productId !== '') {
      this.service.getProductById(this.productId).toPromise().then(data => {
        this.productDetails = data;

        this.editProductForm = this.formBuilder.group({
          'name': new FormControl(this.productDetails.productName, [Validators.required, Validators.minLength(5)]),
          'category': new FormControl(this.productDetails.productCategory, [Validators.required]),
          'description': new FormControl(this.productDetails.productDescription, [Validators.required, Validators.minLength(5)]),
          'imageurl': new FormControl(this.productDetails.productImgUrl, [Validators.required]),
          'price': new FormControl(this.productDetails.productPrice, [Validators.required]),
          'quantity': new FormControl(this.productDetails.productQty, [Validators.required])
        })
        
        this.dataLoaded = true;
      })
        .catch(err => {
          console.log(err);
        })
    }
  }

  updateProduct() {
    this.service.updateProduct(this.productId, this.editProductForm.value).subscribe(data => {
      this._snackbar.open("Product updated successfully")
    }, err => {
      this._snackbar.open("Product update unsuccessful")
    })
  }
}
