import { Injectable } from '@angular/core';
import Konva from 'konva';

import { Template } from 'src/app/app.models';
import { AppStorage } from 'src/app/app.storage';
import { uploadFileData } from 'src/app/tools/helpers';

@Injectable()
export class EditorCanvas {

  template: Template;

  stage: Konva.Stage;

  backgroundLayer = new Konva.Layer();

  background = new Konva.Image();

  textLayer = new Konva.Layer();

  text = new Konva.Text();

  textBorderLayer = new Konva.Layer();

  textBorder = new Konva.Rect();

  textBorderTransformer = new Konva.Transformer({
    rotateEnabled: false
  });

  isVisibleTextBorders = false;

  constructor(private storage: AppStorage) {}

  initStage(container: HTMLDivElement, width: number, height: number) {
    this.stage = new Konva.Stage({container, width, height});

    this.stage.add(this.backgroundLayer);
    this.stage.add(this.textLayer);
    this.stage.add(this.textBorderLayer);

    this.textLayer.add(this.text);
    this.backgroundLayer.add(this.background);
    this.textBorderLayer.add(this.textBorder);

    this.initTextTransforms();
  }

  initTextTransforms() {
    this.textBorder.on('dragmove', (event) => {
      this.template.text.borders.x = event.target.x();
      this.template.text.borders.y = event.target.y();

      this.updateTexts();
      this.storage.save();
    });

    this.textBorderLayer.add(this.textBorderTransformer);
    this.textBorderTransformer.setNode(this.textBorder);
    this.textBorderTransformer.boundBoxFunc((oldBoundBox, newBoundBox) => {
      this.template.text.borders.x = newBoundBox.x;
      this.template.text.borders.y = newBoundBox.y;
      this.template.text.borders.width = newBoundBox.width;
      this.template.text.borders.height = newBoundBox.height;

      this.updateTexts();
      this.storage.save();

      return newBoundBox;
    });
  }

  setTemplate(template: Template) {
    this.template = template;
  }

  uploadImage() {
    uploadFileData('image/*').subscribe(imageData => {
      this.setBackground(imageData);
    });
  }

  showTextBorders() {
    this.isVisibleTextBorders = true;
  }

  hideTextBorders() {
    this.isVisibleTextBorders = false;
    this.textBorderLayer.clear();
  }

  setBackground(src: string, callBack?: () => void) {
    const image = new Image();

    image.onload = () => {
      this.background.setAttrs({
        image,
        width: this.template.canvas.width,
        height: this.template.canvas.height
      });

      this.background.draw();

      if (callBack) {
        callBack();
      }
    };

    image.src = src;

    this.template.image.src = src;
    this.storage.save();
  }

  setText(text: string) {
    this.template.text.value = text.trim();
    this.updateTexts();
  }

  setFontSize(size: string) {
    this.template.text.fontSize = Number(size);
    this.updateTexts();
  }

  setMaxFontSize(size: string) {
    this.template.text.maxFontSize = Number(size);
    this.updateTexts();
  }

  setMinFontSize(size: string) {
    this.template.text.minFontSize = Number(size);
    this.updateTexts();
  }

  setLineHeight(lineHeight: string) {
    this.template.text.lineHeight = Number(lineHeight);
    this.updateTexts();
  }

  updateTexts() {
    const text = this.template.text;

    this.textLayer.clear();
    this.textBorderLayer.clear();

    this.text.setAttrs({
      text: this.template.text.value.trim(),
      fontSize: text.fontSize,
      fontFamily: text.fontFamily,
      width: text.borders.width,
      x: text.borders.x,
      align: text.align,
      lineHeight: text.lineHeight
    });

    this.calcFontSize();
    this.alignCenter();

    if (this.isVisibleTextBorders) {
      this.textBorder.setAttrs({
        width: text.borders.width,
        height: text.borders.height,
        x: text.borders.x,
        y: text.borders.y,
        stroke: '#0091ff',
        strokeWidth: 2,
        draggable: true,
      });

      this.textBorder.draw();
    }

    this.text.draw();
    this.storage.save();
  }

  calcFontSize() {
    let currentFontSize = Number(this.template.text.maxFontSize);

    this.text.setAttr('fontSize', currentFontSize);
    this.text.setAttr('height', null);

    while (this.text.getHeight() > this.template.text.borders.height) {
      this.text.setAttr('fontSize', --currentFontSize);
    }
  }

  alignCenter() {
    const center = (this.template.text.borders.height - this.text.getHeight()) / 2;

    this.text.setAttr('y', center + this.template.text.borders.y);
  }
}
