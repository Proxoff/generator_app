import { Subject } from 'rxjs';
import { NgZone } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

interface Options {

}

export class Draggable {

  afterMove: Subject<Position> = new Subject();

  afterMoveStart: Subject<Position> = new Subject();

  afterMoveEnd: Subject<Position> = new Subject();

  private startPosition = { x: 0, y: 0 };

  private position = {...this.startPosition};

  constructor(
    private element: HTMLElement,
    private options: Options
  ) {
    element.addEventListener('mousedown', this.moveStart);
    document.addEventListener('mouseup', this.moveEnd);
  }

  destroy() {
    this.element.removeEventListener('mousedown', this.moveStart);
    document.removeEventListener('mouseup', this.moveEnd);
    document.removeEventListener('mousemove', this.move);

    this.afterMove.complete();
    this.afterMoveStart.complete();
    this.afterMoveEnd.complete();
  }

  private moveStart = (event: MouseEvent) => {
    this.startPosition.x = event.clientX - this.position.x;
    this.startPosition.y = event.clientY - this.position.y;

    document.addEventListener('mousemove', this.move);
    this.afterMoveStart.next(event);
  }

  private moveEnd = (event: MouseEvent) => {
    this.afterMoveEnd.next(event);
    document.removeEventListener('mousemove', this.move);
  }

  private move = (event: MouseEvent) => {
    this.position.x = event.clientX - this.startPosition.x;
    this.position.y = event.clientY - this.startPosition.y;

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    this.afterMove.next(this.position);
  }
}
