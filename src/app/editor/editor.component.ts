import { Component, ElementRef, AfterViewInit, ViewChild, DoCheck } from '@angular/core';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, DoCheck {

  @ViewChild('canvas') canvasElementRef: ElementRef<HTMLDivElement>;

  @ViewChild('textTransformer') textTransformerElementRef: ElementRef<HTMLDivElement>;

  constructor(public editor: EditorService) { }

  ngAfterViewInit() {
    this.editor.initStage(this.canvasElementRef.nativeElement);
    // this.editor.initTextTransformer(this.textTransformerElementRef.nativeElement);
  }

  ngDoCheck() {
    console.log('ngDoCheck');
  }
}
