import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProductComponent } from './edit-product.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule
      ],
      declarations: [ EditProductComponent ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
