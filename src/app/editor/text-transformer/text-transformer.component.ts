import { Component, AfterViewInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Konva from 'konva';
import { Draggable } from 'src/app/tools/draggable';

@Component({
  selector: 'app-text-transformer',
  templateUrl: './text-transformer.component.html',
  styleUrls: ['./text-transformer.component.scss']
})
export class TextTransformerComponent implements AfterViewInit, OnDestroy {

  @Input() text: Konva.Text;

  @ViewChild('transformer') transformerRef: ElementRef<HTMLElement>;

  transformerDraggable: Draggable;

  constructor() {}

  ngAfterViewInit() {
    const transformer = this.transformerRef.nativeElement;

    this.updateTransformerSizes();

    this.transformerDraggable = new Draggable(transformer, {});

    this.transformerDraggable.afterMove.subscribe(position => {
      this.text.getLayer().clear();

      this.text.setAttr('x', position.x);
      this.text.setAttr('y', position.y);

      this.text.draw();
    });
  }

  ngOnDestroy() {
    this.transformerDraggable.destroy();
  }

  private updateTransformerSizes() {
    const transformer = this.transformerRef.nativeElement;

    transformer.style.width = `${this.text.getWidth()}px`;
    transformer.style.height = `${this.text.getHeight()}px`;
  }
}
