import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextsComponent } from './texts.component';
import { EditorCanvas } from '../template/editor/editor.canvas.service';

@NgModule({
  declarations: [TextsComponent],
  imports: [
    CommonModule
  ],
  providers: [
    EditorCanvas
  ]
})
export class TextsModule { }
