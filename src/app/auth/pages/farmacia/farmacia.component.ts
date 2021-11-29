import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoginRequest } from '../../models/interfaces/auth.interfaces';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.scss']
})
export class FarmaciaComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private subscription$ = new Subscription();

  constructor(
    private fb: FormBuilder, private authService: AuthService,
    private swas: SweetAlertService, private router: Router
    ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public login(): void {
    if (this.form.valid) {
      this.farmaciaLogin();
    } else {
      this.swas.showAlertGeneric('Error', 'Formulario inválido', 'error');
    }
  }

  private farmaciaLogin(): void {
    this.swas.showLoading('Verificando', 'Espere....');
    const body: ILoginRequest = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    this.subscription$.add(this.authService.farmaciaLogin(body).subscribe(data => {
      this.swas.hideLoading();
      //TODO Hacer la persistencia de la sesión.
      this.router.navigateByUrl('/dashboard');
    }, (e: HttpErrorResponse) => {
      this.swas.hideLoading();
      if (e.status === 401) {
        this.swas.showAlertGeneric('Error', 'Usuario o contraseña incorrectos', 'error');
      } else {
        this.swas.showAlertGeneric('Error', 'Algo salió mal, intente más tarde', 'error');
      }
    }));
  }

  //#region Form Getters

  public get isUsernameValid(): boolean {
    const usernameField = this.form.get('username');
    return usernameField.invalid && usernameField.touched;
  }

  public get isPasswordValid(): boolean {
    const passwordField = this.form.get('password');
    return passwordField.invalid && passwordField.touched;
  }

  public getErrorMessage(field: string): string {
    const errors = this.form.get(field).errors;
    const errorKeys = Object.keys(errors);
    let errorMessage = '';
    switch (errorKeys[0]) {
      case 'required':
        errorMessage = 'Este campo es requerido';
        break;
      default:
        errorMessage = '';
        break;
    }
    return errorMessage;
  }

  //#endregion

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

}
