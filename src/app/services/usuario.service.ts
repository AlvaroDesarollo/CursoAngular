import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginForm } from '../interfaces/login-form.interfaces';
import { IRegisterForm } from '../interfaces/register-form.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}
  crearUsuario(formData: IRegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.data.token);
        sessionStorage.setItem('token', res.data.token);
      })
    );
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
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.data.tokenJWT);
          sessionStorage.setItem('token', res.data.tokenJWT);
        }),
        map((rta) => true),
        catchError((err: any) => of(false))
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
