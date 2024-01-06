import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

@NgModule({
  exports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
