import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ProductService } from "../product.service";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
})
export class ProductCreateComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  public createProduct() {
    this.productService.showMessage("Produto criado!");
  }

  public cancel() {
    this.router.navigate(["/products"]);
  }
}
