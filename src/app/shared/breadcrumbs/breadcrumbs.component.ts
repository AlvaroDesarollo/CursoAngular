import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivationEnd, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styles: [],
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  public tituloSubs$:Subscription

  constructor(private router: Router,  private router2: ActivatedRoute,) {
    this.tituloSubs$ = this.getDataRuta();
    console.log(router2.snapshot.children, '--------', (router2.data as any).value)
  }

  ngOnInit() {}
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getDataRuta() {
    return this.router.events
      .pipe(
        filter((ev) => ev instanceof ActivationEnd),
        filter((ev: ActivationEnd) => ev.snapshot.firstChild === null),
        map((ev: ActivationEnd) => ev.snapshot.data.titulo)
      )
      .subscribe((titulo) => {
        console.log(titulo, "Titulo");
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      });
  }
}
