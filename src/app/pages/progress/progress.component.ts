import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progreso1 = 25;
  progreso2 = 45;
  clase1 = 'btn-info';
  clase2 = '';

  get getProgreso1() {
    return `${this.progreso1}%`;
  }

  get getProgreso2() {
    return `${this.progreso2}%`;
  }

  cambioSalida(event: number) {
    console.log('Cambio valor.....', event);
  }
}
