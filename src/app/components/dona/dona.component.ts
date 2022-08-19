import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent {

  // tslint:disable-next-line:no-input-rename no-inferrable-types
  @Input('title') title: string = 'Sin título';
  // tslint:disable-next-line:no-input-rename
  @Input('labels') public labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // tslint:disable-next-line:no-input-rename
  @Input('data') public data: MultiDataSet = [[350, 450, 100]];
  // tslint:disable-next-line:no-input-rename
  @Input('type') public type: ChartType = 'doughnut';
  // tslint:disable-next-line:no-input-rename
  @Input('colors') public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] },
  ];
    // events
    chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
      console.log(event, active);
    }

    chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
      console.log(event, active);
    }

}
