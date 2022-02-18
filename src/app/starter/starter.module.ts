import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter Page' }
      ]
    },
    component: StarterComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, VgCoreModule, VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,RouterModule.forChild(routes)],
  declarations: [StarterComponent]
})
export class StarterModule {}
