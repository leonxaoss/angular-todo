import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildersRoutingModule } from './builders-routing.module';
import { BuildersComponent } from './builders.component';
import { ButtonsModule } from '../../modules/button/buttons.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BuildersComponent],
    imports: [
      CommonModule,
      BuildersRoutingModule,
      ButtonsModule,
      ReactiveFormsModule
    ]
})
export class BuildersModule { }
