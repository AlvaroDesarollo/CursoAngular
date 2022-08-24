import { Injectable } from '@angular/core';
import { AccountSettingsComponent } from '../pages/account-settings/account-settings.component';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');

  constructor() {
    console.log('Service settings.....');
    this.setTheme();
  }
  setTheme() {
    const url = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : '/assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    links.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const checkCurrentTheme = this.linkTheme.getAttribute('href');
      if (btnThemeUrl === checkCurrentTheme) {
        element.classList.add('working');
      }
    });
  }
}
