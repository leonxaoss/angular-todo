import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormContactsRoutingModule } from './form-contacts-routing.module';
import { FormContactsComponent } from './form-contacts.component';
import { InputComponent } from './component/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormContactsComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormContactsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormContactsModule { }
