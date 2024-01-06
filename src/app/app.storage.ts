import { Injectable } from '@angular/core';

import { StorageState } from './app.models';
import { appState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class AppStorage {

  state: StorageState = appState;

  constructor() {
    this.remember();
  }

  save() {
    localStorage.setItem('app-storage', JSON.stringify(this.state));
  }

  remember() {
    const state = JSON.parse(localStorage.getItem('app-storage'));

    if (state) {
      this.state = state;
    }
  }
}
