import { Component, OnInit } from '@angular/core';
import { AppStorage } from '../app.storage';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(public storage: AppStorage) { }

  ngOnInit() {

  }
}
