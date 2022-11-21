import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

const url = environment.baseHttpUrl;
@Injectable({
  providedIn: 'root',
})
export class MainHttpService {
  constructor(private oHttpClient: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.oHttpClient
      .get<ProductModel[]>(url)
      .pipe(catchError(this.errorHandler));
  }

  getProductById(id): Observable<ProductModel> {
    return this.oHttpClient
      .get<ProductModel>(url + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error) {
      return throwError(error);
    } else {
      return throwError('Unknown Error');
    }
  }
}
