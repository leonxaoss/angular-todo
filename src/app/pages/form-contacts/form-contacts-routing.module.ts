import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContactsComponent } from './form-contacts.component';


const routes: Routes = [
  {
    path: '', component: FormContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormContactsRoutingModule { }
