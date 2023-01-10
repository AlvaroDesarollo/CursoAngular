import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { AlertService } from '../../services/alert.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public formulario: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit() {
    this.imgTemp = '';
    this.formulario = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.email, Validators.required]],
    });
  }

  cambiarImagen(ev) {
    const file = ev.target.files[0];
    console.log(ev.target.value, file);
    this.imagenSubir = file;
    if (!file) {
      this.imgTemp = '';
      return;
    }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    };
  }
  async subirImagen() {
    const result = await this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid);
    console.log(result, 'resultado subir imagen');
    if (!result) {
      return this.alertService.alertSimple({
        title: 'Error encontrado',
        msg: 'Error al subir imagen',
        icon: 'error',
      });
    }
    this.usuario.img = result;
    this.alertService.alertSimple({
      title: 'Mensaje',
      msg: 'Imagen actualizada correctamente',
      icon: 'success',
    });
  }
  actualizarPerfil() {
    console.log(this.formulario);
    this.usuarioService
      .actualizarUsuario(this.formulario.value)
      .subscribe((rta: any) => {
        const { nombre, email } = rta.data.usuario;
        const msg = `Su nuevo usuario es <b>${email}</b>`;
        this.alertService.alertSimple({
          title: 'Usuario Actualizado',
          msg,
          icon: 'success',
        });
        this.usuario.nombre = nombre;
        this.usuario.email = email;
      }, (err) => {
        console.log('error', err);
        this.alertService.alertSimple({
          title: 'Error encontrado',
          msg: err.error.msg,
          icon: 'error',
        });
      });
  }
}
