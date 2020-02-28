import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../component/pagination/pagination.component';


@NgModule({
  declarations: [
    AllContactsComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    AllContactsRoutingModule,
    FormsModule
  ]
})
export class AllContactsModule { }
