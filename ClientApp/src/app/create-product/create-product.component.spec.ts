import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { FormBuilder, FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        TextFieldModule
      ],
      declarations: [CreateProductComponent],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); //, category, description, imageurl, price, quantity
  function updateForm(name: string, category: string, description: string, imageurl: string,
                      price: number, quantity: number  ) {
    component.createProductForm.controls['name'].setValue(name);
    component.createProductForm.controls['category'].setValue(category);
    component.createProductForm.controls['description'].setValue(description);
    component.createProductForm.controls['imageurl'].setValue(imageurl);
    component.createProductForm.controls['price'].setValue(price);
    component.createProductForm.controls['quantity'].setValue(quantity);
    
  }
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have default props', fakeAsync(() => {
    
    expect(component.createProductForm.controls.name.value).toEqual('');
  }));
  it('form values should have Validators', fakeAsync(() => {
    updateForm("iPad","Electronics","mock description","www.tech.com", 50, 6);
    expect(component.createProductForm.hasValidator).toBeTruthy();
  }));
  it('form values should be correct type', fakeAsync(() => {
    updateForm("iPad", "Electronics", "mock description", "www.tech.com", 50, 6);
    expect(component.createProductForm.value).toEqual({
      name: "iPad", category: "Electronics",
      description: "mock description", imageurl: "www.tech.com", price: 50, quantity: 6 });
  }));
});
