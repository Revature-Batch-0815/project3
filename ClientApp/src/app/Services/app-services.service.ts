import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/products.model';
//C:\Users\14438\Desktop\RevatureWork\project3\ClientApp\src\products.model.ts

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  private url = 'api/products';
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * getProducts
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/${this.url}`);
  }

  /**
   * searchProducts
   */
  public searchProducts(productSearchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/${this.url}/search?productSearchTerm=${productSearchTerm}`
    );
  }

  /**
   * addProductsApi
   */
  public addProductsApi(addProd: Product): Observable<Product> {
    return this.http.post<Product>(
      `${environment.apiUrl}/${this.url}`,
      addProd
    );
  }

  /**
   * getProductById
   */
  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  /**
   * updateProduct
   */
  public updateProduct(
    id: string,
    updateProduct: Product
  ): Observable<Product> {
    return this.http.put<Product>(
      `${environment.apiUrl}/${this.url}/${id}`,
      updateProduct
    );
  }

  /**
   * deleteProduct
   */
  public deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
