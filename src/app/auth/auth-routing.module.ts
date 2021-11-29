import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmaciaComponent } from './pages/farmacia/farmacia.component';
import { FarmaciaRegistroComponent } from './pages/farmacia-registro/farmacia-registro.component';

const routes: Routes = [
  {
    path: 'farmacias',
    component: FarmaciaComponent
  },
  {
    path: 'farmacia/registro',
    component: FarmaciaRegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
