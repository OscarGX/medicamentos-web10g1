import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FarmaciaComponent } from './pages/farmacia/farmacia.component';
import { MaterialModule } from '../common/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FarmaciaRegistroComponent } from './pages/farmacia-registro/farmacia-registro.component';


@NgModule({
  declarations: [
    FarmaciaComponent,
    FarmaciaRegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
