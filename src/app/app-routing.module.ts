import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'all-contacts',
    loadChildren: () => import('./pages/all-contacts/all-contacts.module').then(mod => mod.AllContactsModule),
    data: {
      animation: 'all-contacts'
    }
  },
  {
    path: 'add-contacts',
    loadChildren: () => import('./pages/form-contacts/form-contacts.module').then(mod => mod.FormContactsModule),
    data: {
      animation: 'add-contacts'
    }
  },
  {
    path: 'edit-contact/:id',
    loadChildren: () => import('./pages/form-contacts/form-contacts.module').then(mod => mod.FormContactsModule),
    data: {
      animation: 'edit-contact'
    }
  },
  {
    path: 'details-contact/:id',
    loadChildren: () => import('./pages/details-contact/details-contact.module').then(mod => mod.DetailsContactModule),
    data: {
      animation: 'details-contact'
    }
  },
  {
    path: 'pag',
    loadChildren: () => import('./pages/pag/pag.module').then(mod => mod.PagModule),
    data: {
      animation: 'pag'
    }
  },
  {
    path: 'builders',
    loadChildren: () => import('./pages/builders/builders.module').then(mod => mod.BuildersModule),
    data: {
      animation: 'builders'
    }
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
