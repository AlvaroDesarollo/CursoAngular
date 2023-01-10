import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
// import {Router}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public  imgUrl: string;
  public nombre: string;
  constructor(
    private sidebarService: SidebarService,
    private userService: UsuarioService
  ) {
    this.menuItems = sidebarService.menu;
    this.imgUrl = this.userService.usuario.imagenUrl;
    this.nombre = this.userService.usuario.nombre;
  }

  ngOnInit() {
  }

}
