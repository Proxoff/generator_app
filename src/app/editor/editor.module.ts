import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { TextTransformerComponent } from './text-transformer/text-transformer.component';

@NgModule({
  declarations: [EditorComponent, TextTransformerComponent],
  imports: [
    CommonModule
  ]
})
export class EditorModule { }
