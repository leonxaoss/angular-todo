import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagRoutingModule } from './pag-routing.module';
import { PagComponent } from './pag.component';
import { PaginationModule } from '../../modules/pagination/pagination.module';
import {LoaderModule} from "../../modules/loader/loader.module";


@NgModule({
  declarations: [PagComponent],
    imports: [
        CommonModule,
        PagRoutingModule,
        PaginationModule,
        LoaderModule
    ]
})
export class PagModule { }
