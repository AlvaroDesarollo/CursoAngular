import { environment } from '../../environments/environment.prod';

const base_url = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public rol?: string,
    public google?: boolean,
    public img?: string,
    public uid?: string
  ) {}

  get imagenUrl() {
    if (this.img) {
      if (this.img.includes('http')) {
        return this.img;
      }
      return `${base_url}/uploads/usuarios/${this.img}`;
    }
    return `${base_url}/uploads/usuarios/no-image`;
  }
}
