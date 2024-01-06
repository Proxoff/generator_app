import { NgModule } from '@angular/core';
import { TemplateComponent } from './template.component';
import { SharedModule } from '../shared/shared.module';
import { EditorComponent } from './editor/editor.component';
import { BackgroundSettingsComponent } from './editor/background-settings/background-settings.component';
import { TextSettingsComponent } from './editor/text-settings/text-settings.component';
import { SettingNumberComponent } from './editor/settings/setting-number/setting-number.component';
import { SettingRangeComponent } from './editor/settings/setting-range/setting-range.component';
import { EditorCanvas } from './editor/editor.canvas.service';

@NgModule({
  declarations: [
    TemplateComponent,
    EditorComponent,
    BackgroundSettingsComponent,
    TextSettingsComponent,
    SettingNumberComponent,
    SettingRangeComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    EditorCanvas
  ]
})
export class TemplateModule { }
