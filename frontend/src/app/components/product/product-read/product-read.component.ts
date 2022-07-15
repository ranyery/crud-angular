import { Component, OnInit } from "@angular/core";

import { ProductService } from "../product.service";
import { Product } from "../product.model";

@Component({
  selector: "app-product-read",
  templateUrl: "./product-read.component.html",
  styleUrls: ["./product-read.component.scss"],
})
export class ProductReadComponent implements OnInit {
  public products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        console.log("🟢 Produtos obtidos com sucesso!");
      },
      error: (error) => console.error(error),
    });
  }
}
