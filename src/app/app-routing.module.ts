import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: 'all-contacts',
    loadChildren: () => import('./pages/all-contacts/all-contacts.module').then(mod => mod.AllContactsModule)
  },
  {
    path: 'add-contacts',
    loadChildren: () => import('./pages/form-contacts/form-contacts.module').then(mod => mod.FormContactsModule)
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () => import('./pages/form-contacts/form-contacts.module').then(mod => mod.FormContactsModule)
  },
  {
    path: 'details-contact/:id',
    loadChildren: () => import('./pages/details-contact/details-contact.module').then(mod => mod.DetailsContactModule)
  },
  {
    path: '**', redirectTo: 'all-contacts'
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'all-contacts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
