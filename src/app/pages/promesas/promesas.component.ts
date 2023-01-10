import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // TODO: Uso de Promesa Simple........
    // const promesa = new Promise((resolve, reject) => {
    //   resolve('Hola Mundo');
    //   reject(new Error('Algo salio mal'));
    // });
    // promesa.then((res) => {
    //   console.log('termine:::', res);
    // }).catch((err) => {
    //   console.error('Error:::', err);
    // });



    this.getUsuarios().then((res) => {
      console.log('termine:::', res);
    });
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=2')
      .then((res) => res.json())
      .then((users) => resolve(users.data));
    });
  }

}
