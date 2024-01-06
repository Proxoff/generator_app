import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class EditorStorage {

  state: '';

  constructor() {
    this.remember();
  }

  save() {
    localStorage.setItem('imageStory', JSON.stringify(this.state));
  }

  remember() {
    const state = JSON.parse(localStorage.getItem('imageStory'));

    if (state) {
      this.state = state;
    }
  }
}
