import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStorage } from '../app.storage';
import { Template } from '../app.models';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  template: Template;

  constructor(
    public activeRoute: ActivatedRoute,
    public storage: AppStorage
  ) { }

  ngOnInit() {
    this.template = this.storage.state.templates.find(template => {
      return template.id === this.activeRoute.snapshot.params.id;
    });
  }

}
