import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagRoutingModule } from './pag-routing.module';
import { PagComponent } from './pag.component';
import { PaginationModule } from '../../modules/pagination/pagination.module';
import {LoaderModule} from '../../modules/loader/loader.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PagComponent],
    imports: [
        CommonModule,
        PagRoutingModule,
        PaginationModule,
        LoaderModule,
        ReactiveFormsModule
    ]
})
export class PagModule { }
