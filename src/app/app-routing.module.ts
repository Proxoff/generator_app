import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { TemplatesComponent } from './templates/templates.component';
import { TemplatesModule } from './templates/templates.module';
import { TemplateComponent } from './template/template.component';
import { TemplateModule } from './template/template.module';
import { TextsComponent } from './texts/texts.component';
import { TextsModule } from './texts/texts.module';
import { EditorComponent } from './editor/editor.component';
import { EditorModule } from './editor/editor.module';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent
  },
  {
    path: 'template/:id',
    component: TemplateComponent
  },
  {
    path: 'texts',
    component: TextsComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    TemplatesModule,
    TemplateModule,
    TextsModule,
    DashboardModule,
    EditorModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
