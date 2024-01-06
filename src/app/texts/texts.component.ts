import { Component, ViewChild, ElementRef } from '@angular/core';

import { AppStorage } from '../app.storage';
import { Text } from '../app.models';
import { EditorCanvas } from '../template/editor/editor.canvas.service';
import { downloadURI } from '../tools/helpers';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss']
})
export class TextsComponent {

  @ViewChild('postTextarea') postTextarea: ElementRef<HTMLTextAreaElement>;

  selectedTexts: Text[] = [];

  constructor(
    public storage: AppStorage,
    public canvas: EditorCanvas
  ) {}

  addText() {
    this.storage.state.texts.push({
      value: this.postTextarea.nativeElement.value
    });

    this.storage.save();

    this.postTextarea.nativeElement.value = '';
  }

  removeText(text: Text) {
    this.storage.state.texts = this.storage.state.texts.filter(item => {
      return item !== text;
    });

    this.selectedTexts = this.selectedTexts.filter(item => {
      return item !== text;
    });

    this.storage.save();
  }

  switchText(text: Text) {
    if (this.selectedTexts.find(item => item === text)) {
      this.selectedTexts = this.selectedTexts.filter(item => item !== text);
    } else {
      this.selectedTexts.push(text);
    }
  }

  isSelectedText(text: Text) {
    return this.selectedTexts.find(item => item === text);
  }

  generateAllTexts() {
    const canvasElement = document.createElement('div');
    const template = this.storage.state.templates[0];

    this.canvas.setTemplate(template);
    this.canvas.initStage(canvasElement, template.canvas.width, template.canvas.height);

    this.canvas.setBackground(template.image.src, () => {
      this.storage.state.texts.forEach((text, index) => {
        this.canvas.setText(text.value);
        this.canvas.updateTexts();

        downloadURI(this.canvas.stage.toDataURL({
          mimeType: 'image/jpeg',
          quality: 1,
          pixelRatio: 2.4
        }), index);
      });
    });
  }
}
