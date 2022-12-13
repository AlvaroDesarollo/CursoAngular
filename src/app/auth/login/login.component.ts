import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

//TODO: Mover a servicio de alertas
import swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formularioValid = false;
  public formulario = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.email, Validators.required],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '620295046597-16q27r1ls1g8q6v0mvd4561vbpi595v8.apps.googleusercontent.com',
      callback: (response) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      // document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    console.log('Encoded JWT ID token: ' + response.credential);
    this.userService.loginGoogle(response.credential).subscribe(
      (rta) => {
        console.log('Ok Google', rta);
        return this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        })
      },
      (err) => {
        console.error('Error en crear Usuario:', err.error);
        swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
  login() {
    console.log(this.formulario.value);

    this.userService.login(this.formulario.value).subscribe(
      (rta) => {
        console.log(rta);
        if (this.formulario.get('remember').value) {
          localStorage.setItem('email', this.formulario.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.error('Error en crear Usuario:', err.error);
        swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
