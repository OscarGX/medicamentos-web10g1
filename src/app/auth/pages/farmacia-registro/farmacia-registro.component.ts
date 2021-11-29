import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-farmacia-registro',
  templateUrl: './farmacia-registro.component.html',
  styleUrls: ['./farmacia-registro.component.scss']
})
export class FarmaciaRegistroComponent implements OnInit {

  public form1: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForms();
  }

  ngOnInit(): void {}

  //#region Form Getters
  //* Form 1
  public get isNombreValid(): boolean {
    const field = this.form1.get('nombre');
    return field.invalid && field.touched;
  }

  public get isRfcValid(): boolean {
    const field = this.form1.get('rfc');
    return field.invalid && field.touched;
  }

  public get isTelefonoValid(): boolean {
    const field = this.form1.get('telefono');
    return field.invalid && field.touched;
  }

  public get isDescripcionValid(): boolean {
    const field = this.form1.get('descripcion');
    return field.invalid && field.touched;
  }

  //* Form 2

  public get isCalleValid(): boolean {
    const field = this.form2.get('calle');
    return field.invalid && field.touched;
  }

  public getErrorMessage(fieldName: string, formNumber: number): string {
    let errorMessage = '';
    const field = (formNumber === 1 ? this.form1.get(fieldName) : formNumber === 2 ? this.form2.get(fieldName) : this.form3.get(fieldName));
    const errors = field.errors;
    const erroKeys = Object.keys(errors);
    if (erroKeys.length > 0) {
      switch (erroKeys[0]) {
        case 'required':
          errorMessage = 'Este campo es requerido';
          break;
        default:
          errorMessage = '';
          break;
      }
    }
    return errorMessage;
  }
  //#endregion

  private createForms(): void {
    this.form1 = this.fb.group({
      nombre: ['', [
        Validators.required
      ]],
      descripcion: ['', [
        Validators.required
      ]],
      rfc: ['', [
        Validators.required
      ]],
      telefono: ['', [
        Validators.required
      ]]
    });
    this.form2 = this.fb.group({
      calle: ['', [
        Validators.required
      ]],
      numeroInterior: ['', []],
      numeroExterior: ['', []],
      estadoId: ['', [Validators.required]],
      municipioId: [{ value: '', disabled: true }, [Validators.required]],
      coloniaId: [{ value: '', disabled: true }, [Validators.required]]
    });
    this.form3 = this.fb.group({
      correoElectronico: ['', [
        Validators.required
      ]],
      username: ['', [
        Validators.required
      ]],
      contrasena: ['', [
        Validators.required
      ]],
      repeatPassword: ['', [
        Validators.required
      ]]
    });
  }

}
