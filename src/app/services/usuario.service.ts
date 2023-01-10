import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginForm } from '../interfaces/login-form.interfaces';
import { IRegisterForm } from '../interfaces/register-form.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario;
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }
  crearUsuario(formData: IRegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.data.token);
        sessionStorage.setItem('token', res.data.token);
      })
    );
  }

  actualizarUsuario(data: {email: string, nombre: string, rol?: string}) {
    data = {
      ...data,
      rol: this.usuario.rol
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {        headers: {
      'x-token': this.token,
    }});
  }

  login(formData: ILoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.data.token);
        sessionStorage.setItem('token', res.data.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        console.log('ressssssssssssssss', res);
        localStorage.setItem('emailGoogle', res.data.user.email);
        sessionStorage.setItem('emailGoogle', res.data.user.email);
        localStorage.setItem('token', res.data.user.tokenJWT);
        sessionStorage.setItem('token', res.data.user.tokenJWT);
      })
    );
  }

  validarToken() {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {

          const {email, nombre, rol, uid, img} = res.data.usuario;
          const isGoogle = res.data.usuario.google;
          this.usuario = new Usuario(nombre, email, '', rol, isGoogle, img, uid);
          localStorage.setItem('token', res.data.tokenJWT);
          sessionStorage.setItem('token', res.data.tokenJWT);
          return true;
        }),
        catchError((err: any) => {
          console.error('Error login: ', err);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    const userGoogle =
      localStorage.getItem('emailGoogle') ||
      sessionStorage.getItem('emailGoogle');
    if (userGoogle) {
      google.accounts.id.revoke(userGoogle, () => {
        return this.ngZone.run(() => {
          this.router.navigateByUrl('/login');
        });
      });
    }
    return this.router.navigateByUrl('/login');
  }
}
