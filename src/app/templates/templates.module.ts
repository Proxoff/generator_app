import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TemplatesComponent } from './templates.component';

@NgModule({
  declarations: [
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TemplatesModule { }
