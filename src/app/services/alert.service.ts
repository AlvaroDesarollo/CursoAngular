import { Injectable } from '@angular/core';
import swal, { SweetAlertIcon } from 'sweetalert2';

interface IAlertService {
  title: string;
  msg: string;
  icon?: SweetAlertIcon;
}
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public alertSimple(data: IAlertService) {
    swal.fire(data.title, data.msg, data.icon);
  }
}
