import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaVendedorPage } from './consulta-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaVendedorPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaVendedorPage]
})
export class ConsultaVendedorPageModule {}
