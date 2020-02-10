import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';


@NgModule({
  declarations: [
    AllContactsComponent
  ],
  imports: [
    CommonModule,
    AllContactsRoutingModule
  ]
})
export class AllContactsModule { }
