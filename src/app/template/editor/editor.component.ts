import { Component, ViewChild, ElementRef, NgZone, AfterViewInit, Input, OnInit } from '@angular/core';

import { EditorStorage } from './editor.storage';
import { EditorCanvas } from './editor.canvas.service';
import { Template } from 'src/app/app.models';
import { AppStorage } from 'src/app/app.storage';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnInit {

  @Input() templateId: string;

  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLDivElement>;

  template: Template;

  settings = this.storage.state.settings;

  state = this.storage.state;

  constructor(
    private zone: NgZone,
    public storage: EditorStorage,
    public canvas: EditorCanvas,
    public appStorage: AppStorage,
  ) { }

  ngOnInit() {
    this.template = this.appStorage.state.templates.find(template => {
      return template.id === this.templateId;
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.canvas.setTemplate(this.template);

      this.canvas.initStage(
        this.canvasElement.nativeElement,
        this.template.canvas.width,
        this.template.canvas.height
      );

      this.canvas.setBackground(this.template.image.src);
      this.canvas.setText(this.template.text.value);

      window.onload = () => {
        this.canvas.updateTexts();
      }
    });
  }

  setPanelTab(tab: 'image' | 'text') {
    this.state.aside.activeTab = tab;
    this.storage.save();
  }

  setScale(size: string) {
    this.template.canvas.scale = Number(size);
    this.appStorage.save();
  }

  getCanvasSizePx() {
    return {
      height: this.template.canvas.height * this.template.canvas.scale / 100,
      width: this.template.canvas.width * this.template.canvas.scale / 100,
    };
  }
}
