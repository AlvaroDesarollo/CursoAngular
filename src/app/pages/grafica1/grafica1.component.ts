import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  grafica1: Array<any> = [
    {
      title: 'Ventas',
      labels: ['Enero', 'Febrero', 'Marzo'],
      data: [[65, 59, 80]],
      colors: [{ backgroundColor: ['#ABEBC6', '#A9DFBF', '#DAF7A6'] }],
    },
  ];

  grafica2: Array<any> = [
    {
      title: 'Comidas',
      labels: ['Pizza', 'Hamburguesa', 'Perro'],
      data: [[500, 100, 300]],
    }
  ];
  grafica3: Array<any> = [
    {
      title: 'Carros',
      labels: ['Audi', 'BMW', 'Mercedes'],
      data: [[500, 100, 300]],
      colors: [{ backgroundColor: ['#EBDEF0', '#AF7AC5', '#884EA0'] }],
    }
  ];
  grafica4: Array<any> = [
    {
      title: '',
      labels: ['Iphone', 'Samsung', 'Huawei', 'LG'],
      data: [[100, 500, 900, 30]],
      colors: [{ backgroundColor: ['#FCF3CF', '#FAD7A0', '#F4D03F', '#BA4A00'] }],
    }
  ];
}
