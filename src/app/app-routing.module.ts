import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/starter', pathMatch: 'full' },
      {
        path: 'starter',
        loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
