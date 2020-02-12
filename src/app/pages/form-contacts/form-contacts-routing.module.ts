import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormContactsComponent } from './form-contacts.component';
import { FormCanDeactivateGuard } from '../guards/form-can-deactivate.guard';


const routes: Routes = [
  {
    path: '', component: FormContactsComponent,
    canDeactivate: [FormCanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormContactsRoutingModule { }
