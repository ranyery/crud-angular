import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { API_PATH } from "src/environments/environment";

import { Observable } from "rxjs";

import { MatSnackBar } from "@angular/material/snack-bar";

import { Product } from "./product.model";

@Injectable({ providedIn: "root" })
export class ProductService {
  private readonly BASE_URL = `${API_PATH}/products`;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}

  public showMessage(message: string): void {
    this.snackBar.open(message, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  public create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.BASE_URL, product);
  }

  public getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }

  public getById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.BASE_URL}/${id}`);
  }

  public update(product: Product): Observable<Product> {
    const url = `${this.BASE_URL}/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }

  public deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
