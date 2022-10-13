import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/products.model';
import { AppServiceService } from '../../Services/app-services.service';

import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  Products: Product[] = [];

  categories: Array<any> = [
    { name: 'Computers & Displays', value: 'Computers & Displays' },
    { name: 'Communication & Audio', value: 'Communication & Audio' },
    { name: 'Components & Networking', value: 'Components & Networking' },
    { name: 'Console Systems & Games', value: 'Console Systems & Games' }
  ]
  form!: FormGroup;
  filteredProducts: Product[] = [];

  constructor(private productService: AppServiceService, fb: FormBuilder) {
    this.form = fb.group({
      selectedCategories: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((results: Product[]) => (this.Products = results));
    this.productService.getProducts().subscribe((results: Product[]) => (this.filteredProducts = results));
  }

  onCheckboxChange(event: any) {
    const selectedCategories = (this.form.controls['selectedCategories'] as FormArray);
    if (event.target.checked) {
      selectedCategories.push(new FormControl(event.target.value));
    }
    else {
      const index = selectedCategories.controls.findIndex(x => x.value === event.target.value);
      selectedCategories.removeAt(index);
    }
  }

  submit() {
    const selectedCategories = (this.form.controls['selectedCategories'] as FormArray);
    if (selectedCategories.length == 1) {
      this.filteredProducts = this.Products.filter(item => item.productCategory == selectedCategories.value[0]);
      console.log(this.filteredProducts);
    }
    else if (selectedCategories.length == 2) {
      this.filteredProducts = this.Products.filter(item => item.productCategory == selectedCategories.value[0] || item.productCategory == selectedCategories.value[1]);
      console.log(this.filteredProducts);
    }
    else if (selectedCategories.length == 3) {
      this.filteredProducts = this.Products.filter(item => item.productCategory == selectedCategories.value[0] || item.productCategory == selectedCategories.value[1] || item.productCategory == selectedCategories.value[2]);
      console.log(this.filteredProducts);
    }
    else {
      this.productService.getProducts().subscribe((results: Product[]) => (this.filteredProducts = results));
    }
  }
}
