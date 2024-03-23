import { Component,ElementRef,Inject,ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Browser } from '@syncfusion/ej2-base';
import { ImageEditorComponent, ShapeChangeEventArgs, ToolbarEventArgs } from '@syncfusion/ej2-angular-image-editor';
import { TuiImageEditorComponent } from 'tui-image-editor-angular';
import ImageEditor from 'tui-image-editor';

@Component({
  selector: 'app-custom-doc-image-edit',
  templateUrl: './custom-doc-image-edit.component.html',
  styleUrls: ['./custom-doc-image-edit.component.css']
})
export class CustomDocImageEditComponent {

  constructor(public dialogRef: MatDialogRef<CustomDocImageEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
  

  }
  

  
}
