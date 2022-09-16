import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit {
  constructor() {}

  public intervalSubs: Subscription;
  ngOnInit() {
    // this.retornasObsrvable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (event) => console.log('Sub', event),
    //     (err) => console.error('Error', err),
    //     () => console.log('ObsComplete')
    //   );

    this.intervalSubs = this.retornaIntervalos().subscribe(
      (ev) => console.log('Obs', ev),
    )
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalos(): Observable<number> {
    const interval$ = interval(500).pipe(
      map(valor => valor + 10),
      filter(valor => (valor % 2 === 0) ? true : false),
      take(10),
    );
    return interval$;
  }
  retornasObsrvable() {
    let i = 0;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 10) {
          observer.complete();
          clearInterval(interval);
        }
        if (i === 4) {
          observer.error('error');
        }
      }, 1000);
    });
  }



  Observable() {
    // TODO: Uso de un observable manual
    let i = 0;
    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 10) {
          observer.complete();
          clearInterval(interval);
        }
        if (i === 4) {
          observer.error('error');
        }
      }, 1000);
    });

    obs$.pipe(retry(1)).subscribe(
      (event) => console.log('Sub', event),
      (err) => console.error('Error', err),
      () => console.log('ObsComplete')
    );
  }
}
