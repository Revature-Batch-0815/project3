import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/products.model';
import { AppServiceService } from '../../services/app-services.service';

import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, FormRecord } from '@angular/forms';

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

  productBank: Product[] = [];
  private _searchTerm: string = '';

  get searchTerm(): string { return this._searchTerm; }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredProducts = this.productBank.slice(0);
    this.filteredProducts = this.filterPro(value);
  }

  filterPro(searchString: string) {
    return this.filteredProducts.filter(product =>
      product.productName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 ||
      product.productDescription.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }



  constructor(private productService: AppServiceService, fb: FormBuilder) {
    this.form = fb.group({
      selectedCategories: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((results: Product[]) => (this.Products = results));
    this.productService.getProducts().subscribe((results: Product[]) => (this.filteredProducts = results));
    this.productService.getProducts().subscribe((results: Product[]) => (this.productBank = results));
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

    //Sort by Category
    if (selectedCategories.length == 1) {
      this.filteredProducts = this.Products.filter(item => item.productCategory == selectedCategories.value[0]);
      this.productBank = this.filteredProducts.slice(0);
    }
    else if (selectedCategories.length == 2) {
      this.filteredProducts = this.Products.filter(item => item.productCategory == selectedCategories.value[0] || item.productCategory == selectedCategories.value[1]);
      this.productBank = this.filteredProducts.slice(0);
    }
    else if (selectedCategories.length == 3) {
      this.filteredProducts = this.Products.filter(item => item.productCategory == selectedCategories.value[0] || item.productCategory == selectedCategories.value[1] || item.productCategory == selectedCategories.value[2]);
      this.productBank = this.filteredProducts.slice(0);
    }
    else {
      this.filteredProducts = this.Products;
      this.productBank = this.filteredProducts.slice(0);
    }

    //Sort by Price
    const less = document.getElementById('lessThan') as FormRecord | null;
    const greater = document.getElementById('greaterThan') as FormRecord | null;

    if (less?.value && greater?.value) {
      this.filteredProducts = this.productBank.filter(item => Number(item.productPrice) >= Number(greater.value) && Number(item.productPrice) <= Number(less.value));
    }
    else if (less?.value) {
      this.filteredProducts = this.productBank.filter(item => Number(item.productPrice) <= Number(less.value));
    }
    else if (greater?.value) {
      this.filteredProducts = this.productBank.filter(item => Number(item.productPrice) >= Number(greater.value));
    }
  }
}
