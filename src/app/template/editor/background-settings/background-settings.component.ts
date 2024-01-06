import { Component, Input, OnInit, NgZone } from '@angular/core';


import { uploadFileData } from '../../../tools/helpers';
import { EditorStorage } from '../editor.storage';
import { EditorCanvas } from '../editor.canvas.service';
import { AppStorage } from 'src/app/app.storage';
import { Template } from 'src/app/app.models';

@Component({
  selector: 'app-background-settings',
  templateUrl: './background-settings.component.html',
  styleUrls: ['./background-settings.component.scss']
})
export class BackgroundSettingsComponent implements OnInit {

  @Input() template: Template;

  constructor(
    private storage: AppStorage,
    private canvas: EditorCanvas,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.setBackground(this.template.image.src);
  }

  uploadImage() {
    uploadFileData('image/*').subscribe(imageData => {
      this.setBackground(imageData);
    });
  }

  setBackground(src: string) {
    const image = new Image();

    image.onload = () => {
      this.canvas.background.setAttrs({
        image,
        width: this.template.canvas.width,
        height: this.template.canvas.height
      });

      this.canvas.background.draw();
    };

    image.src = src;

    this.template.image.src = src;
    this.storage.save();
  }

}
