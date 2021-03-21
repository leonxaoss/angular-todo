import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsContactRoutingModule } from './details-contact-routing.module';
import { DetailsContactComponent } from './details-contact.component';
import { ButtonsModule } from '../../modules/button/buttons.module';


@NgModule({
  declarations: [
    DetailsContactComponent
  ],
    imports: [
        CommonModule,
        DetailsContactRoutingModule,
        ButtonsModule,
    ]
})
export class DetailsContactModule { }
