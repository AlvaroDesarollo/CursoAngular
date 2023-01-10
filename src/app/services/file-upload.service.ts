import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {
    try {
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formaData = new FormData();
      formaData.append('imagen', archivo);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.token
        },
        body: formaData
      });
      const data = await resp.json();
      return data.data.nombreArchivo;
    } catch (err) {
      console.log('Error al subir archivo', err);
      return false;
    }
  }
}
