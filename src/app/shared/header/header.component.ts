import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public  imgUrl: string;
  public usuario: any;
  constructor(private userService: UsuarioService) {
    this.imgUrl = this.userService.usuario.imagenUrl;
    this.usuario = this.userService.usuario;
   }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
