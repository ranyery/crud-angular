import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.scss"],
})
export class ProductDeleteComponent implements OnInit {
  public product: Product = { name: "", price: 0 };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.getById(id).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error: (error) => console.error(error),
    });
  }

  public deleteProduct(): void {
    this.productService.deleteById(this.product.id).subscribe({
      next: () => {
        this.productService.showMessage("🔴 Produto deletado com sucesso!");
        this.router.navigate(["/products"]);
      },
      error: (error) => console.error(error),
    });
  }

  public cancel(): void {
    this.router.navigate(["/products"]);
  }
}
