import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductDetailsComponent } from './product-details.component';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('ProductDetailsComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
               RouterTestingModule
      ],
      declarations: [ ProductDetailsComponent ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
