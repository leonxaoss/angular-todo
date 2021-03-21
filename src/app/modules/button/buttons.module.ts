import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlainButtonComponent } from './plain-button/plain-button.component';



@NgModule({
  declarations: [
    PlainButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlainButtonComponent
  ],
})
export class ButtonsModule { }
