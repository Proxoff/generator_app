import { Injectable, NgZone, ApplicationRef } from '@angular/core';
import Konva from 'konva';
import { defaultTextConfig } from './editor.constants';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  stage: Konva.Stage;

  layers: Konva.Layer[];

  transformableText: Konva.Text;

  constructor(
    private zone: NgZone,
    private app: ApplicationRef
  ) {}

  initStage(canvasElement: HTMLDivElement) {
    this.zone.runOutsideAngular(() => {
      this.stage = new Konva.Stage({
        container: canvasElement,
        width: 400,
        height: 400
      });
    });
  }

  addText() {
    const layer = new Konva.Layer({
      name: 'text',
    });

    const text = new Konva.Text(defaultTextConfig);

    text.on('click', () => {
      this.transformableText = text;
      this.app.tick();
    });

    layer.add(text);
    this.stage.add(layer);
  }

  transformText(layer: Konva.Layer) {

  }

  // highlightText(text: Konva.Text) {
  //   this.highlightedText = text;

  //   this.phantomElement.style.width = `${text.getWidth()}px`;
  //   this.phantomElement.style.height = `${text.getHeight()}px`;

  //   this.phantom.afterMove.subscribe(position => {
  //     text.setAttr('x', position.x);
  //     text.setAttr('y', position.y);

  //     text.draw();
  //   });
  // }
}
