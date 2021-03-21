import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../component/pagination/pagination.module';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AllContactsComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    AllContactsRoutingModule,
    FormsModule,
    PaginationModule
  ]
})
export class AllContactsModule { }
