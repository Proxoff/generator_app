import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';

import { EditorCanvas } from '../editor.canvas.service';
import { Template } from 'src/app/app.models';

@Component({
  selector: 'app-text-settings',
  templateUrl: './text-settings.component.html',
  styleUrls: ['./text-settings.component.scss']
})
export class TextSettingsComponent implements AfterViewInit, OnDestroy {

  @Input()
  template: Template;

  constructor(
    public canvas: EditorCanvas
  ) {}

  ngAfterViewInit() {
    this.canvas.setTemplate(this.template);
    this.canvas.showTextBorders();
    // setTimeout(() => {
    // });
  }

  ngOnDestroy() {
    this.canvas.hideTextBorders();
  }
}
