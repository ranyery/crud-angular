import { ProductService } from "./../product.service";
import { Product } from "./../product.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.scss"],
})
export class ProductUpdateComponent implements OnInit {
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
      error: (error) => {
        console.error(error);
      },
    });
  }

  public updateProduct(): void {
    this.productService.update(this.product).subscribe({
      next: () => {
        this.productService.showMessage("Produto atualizado com sucesso!");
        this.router.navigate(["/products"]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public cancel(): void {
    this.router.navigate(["/products"]);
  }
}
