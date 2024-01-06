import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-setting-number',
  templateUrl: './setting-number.component.html',
  styleUrls: ['./setting-number.component.scss', '../setting.scss']
})
export class SettingNumberComponent {

  @Input() value: number;

  @Output() oninput: EventEmitter<number> = new EventEmitter();

  onInput(value: string) {
    this.oninput.emit(Number(value));
  }
}
