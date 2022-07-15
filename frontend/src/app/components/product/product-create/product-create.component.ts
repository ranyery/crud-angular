import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Product } from "../product.model";

import { ProductService } from "../product.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  public product: Product = { name: "", price: null };

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  public createProduct() {
    this.productService.create(this.product).subscribe({
      next: () => {
        this.productService.showMessage("Produto criado!");
        this.router.navigate(["/products"]);
      },
      error: (error) => console.error(error),
    });
  }

  public cancel() {
    this.router.navigate(["/products"]);
  }
}
