import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-setting-range',
  templateUrl: './setting-range.component.html',
  styleUrls: [
    '../setting.scss',
    './setting-range.component.scss'
  ]
})
export class SettingRangeComponent {

  @Input() min: number;

  @Input() max: number;

  @Input() step: number;

  @Input() value: number;

  @Output() oninput: EventEmitter<number> = new EventEmitter();

  onInput(value: string) {
    this.oninput.emit(Number(value));
  }
}
