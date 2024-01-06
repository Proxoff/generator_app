import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorStorage {

  state = {
    aside: {
      activeTab: 'image'
    },

    settings: {
      canvas: {
        width: 600,
        height: 600,
        scale: 100,
      },
      text: {
        value: '',
        autoResize: false,
        minFontSize: 25,
        maxFontSize: 40,
        fontSize: 30,
        lineHeight: 1,
        fontFamily: 'BebasNeue-Bold',
        textAlign: 'center',
        borders: {
          x: 0,
          y: 0,
          width: 600,
          height: 600
        }
      },
      image: {
        src: '',
      }
    }
  };

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
