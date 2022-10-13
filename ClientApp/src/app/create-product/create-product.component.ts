import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppServiceService } from 'src/app/services/app-services.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createProductForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private appService: AppServiceService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.createProductForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'category': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'imageurl': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),
      'quantity': new FormControl('', [Validators.required])
    })
  }

  addProductsApi() {
    this.appService.addProductsApi(this.createProductForm.value).subscribe(data => {
      this._snackbar.open('Product created successfully')
    }, err => {
      this._snackbar.open('Product creation unsuccessful')
    })
  }

}
