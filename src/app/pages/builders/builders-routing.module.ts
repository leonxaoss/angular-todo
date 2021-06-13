import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildersComponent } from './builders.component';

const routes: Routes = [
  {
    path: '',
    component: BuildersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildersRoutingModule { }
