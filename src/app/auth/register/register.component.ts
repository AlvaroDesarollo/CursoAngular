import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formularioValid = false;
  public formulario = this.fb.group(
    {
      nombre: ['Alvaro', [Validators.required, Validators.minLength(3)]],
      email: ['test@test.com', [Validators.email, Validators.required]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
      password2: ['123456', [Validators.required, Validators.minLength(6)]],
      terminos: [false, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private alertService: AlertService
  ) {}

  crearUsuario() {
    this.formularioValid = true;
    console.log(this.formulario.value);
    console.log('Formulario::::::', this.formulario);
    if (this.formulario.invalid) {
      return console.log('Fromulario Valido.....');
    }
    // Creacion de Usuario
    this.usuarioService.crearUsuario(this.formulario.value).subscribe(
      (resp) => {
        console.log('usuarioCreado::', resp);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.error('Error en crear Usuario:', err.error);
        this.alertService.alertSimple({
          title: 'Error',
          msg: err.error.msg,
          icon: 'error',
        });
      }
    );
  }
  contrasenasNoValidas(): boolean {
    const pass1 = this.formulario.get('password').value;
    const pass2 = this.formulario.get('password2').value;
    if (pass1 !== pass2 && this.formularioValid) {
      return true;
    }
    return false;
  }
  campoNoValido(campo: string): boolean {
    if (this.formulario.get(campo).invalid && this.formularioValid) {
      return true;
    }
    return false;
  }
  aceptaTerminos(): boolean {
    return !this.formulario.get('terminos').value && this.formularioValid;
  }
  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control.value === pass2Control.value) {
        return pass2Control.setErrors(null);
      }
      pass2Control.setErrors({ noEsIgual: true });
    };
  }

  ngOnInit() {}
}
