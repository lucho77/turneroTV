import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { ParamComponent } from './layouts/paramComponent';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/starter', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      },
    ]
  },
  {
    path: 'param/:user/:pass',
    component: ParamComponent,
  },


  {
    path: '**',
    redirectTo: '/starter'
  }
];
