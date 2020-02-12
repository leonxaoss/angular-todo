import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsContactRoutingModule } from './details-contact-routing.module';
import { DetailsContactComponent } from './details-contact.component';


@NgModule({
  declarations: [
    DetailsContactComponent
  ],
  imports: [
    CommonModule,
    DetailsContactRoutingModule,
  ]
})
export class DetailsContactModule { }
