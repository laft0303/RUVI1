import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'registro-documento', loadChildren: './registro-documento/registro-documento.module#RegistroDocumentoPageModule' },
  { path: 'datos-personales', loadChildren: './datos-personales/datos-personales.module#DatosPersonalesPageModule' },
  { path: 'salud', loadChildren: './salud/salud.module#SaludPageModule' },
  { path: 'sitio-labor', loadChildren: './sitio-labor/sitio-labor.module#SitioLaborPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'registro-usuario', loadChildren: './registro-usuario/registro-usuario.module#RegistroUsuarioPageModule' },
  { path: 'consulta', loadChildren: './consulta/consulta.module#ConsultaPageModule' },
  { path: 'consulta-vendedor', loadChildren: './consulta-vendedor/consulta-vendedor.module#ConsultaVendedorPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
