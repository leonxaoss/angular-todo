import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsContactRoutingModule } from './details-contact-routing.module';
import { DetailsContactComponent } from './details-contact.component';
import { ButtonsModule } from '../../modules/button/buttons.module';
import { LoaderModule } from '../../modules/loader/loader.module';


@NgModule({
  declarations: [
    DetailsContactComponent
  ],
    imports: [
        CommonModule,
        DetailsContactRoutingModule,
        ButtonsModule,
        LoaderModule,
    ]
})
export class DetailsContactModule { }
