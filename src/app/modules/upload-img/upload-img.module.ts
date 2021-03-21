import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImgComponent } from './upload-img.component';



@NgModule({
  declarations: [UploadImgComponent],
  exports: [
    UploadImgComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UploadImgModule { }
