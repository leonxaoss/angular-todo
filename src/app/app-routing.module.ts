import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    path: 'pag',
    loadChildren: () => import('./pages/pag/pag.module').then(mod => mod.PagModule)
  },
  {
    path: 'builders',
    loadChildren: () => import('./pages/builders/builders.module').then(mod => mod.BuildersModule)
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
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
