import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllContactsRoutingModule } from './all-contacts-routing.module';
import { AllContactsComponent } from './all-contacts.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from '../../modules/pagination/pagination.module';
import { FilterPipe } from './pipes/filter.pipe';
import { LoaderModule } from '../../modules/loader/loader.module';


@NgModule({
  declarations: [
    AllContactsComponent,
    FilterPipe,
  ],
    imports: [
        CommonModule,
        AllContactsRoutingModule,
        FormsModule,
        PaginationModule,
        LoaderModule
    ]
})
export class AllContactsModule { }
