import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
declare function customInitFunction();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  theme: any;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    customInitFunction();
  }

}
