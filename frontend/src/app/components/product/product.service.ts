import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_PATH } from "src/environments/environment";

import { MatSnackBar } from "@angular/material/snack-bar";

import { Product } from "./product.model";

import { catchError, EMPTY, map, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProductService {
  private readonly BASE_URL = `${API_PATH}/products`;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}

  public showMessage(message: string, isError: boolean = false): void {
    this.snackBar.open(message, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  public create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.BASE_URL, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  public getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BASE_URL).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  public getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.BASE_URL}/${id}`).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  public update(product: Product): Observable<Product> {
    const url = `${this.BASE_URL}/${product.id}`;
    return this.httpClient.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  public deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`).pipe(
      map((obj) => obj),
      catchError((error) => this.errorHandler(error))
    );
  }

  private errorHandler(error: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
