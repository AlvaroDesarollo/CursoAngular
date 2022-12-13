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
}
