import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({ selector: "[myFor]" })
export class ForDirective implements OnInit {
  @Input("myForEm") numbers: Array<number> = [];
  @Input("myForUsando") texto: string = "";

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    for (let number of this.numbers) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: number,
      });
    }

    // console.log("myForEm", this.numbers);
    // console.log("myForUsando", this.texto);
  }
}
