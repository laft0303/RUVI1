import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SitioLaborPage } from './sitio-labor.page';

const routes: Routes = [
  {
    path: '',
    component: SitioLaborPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SitioLaborPage]
})
export class SitioLaborPageModule {}
