import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse, ILoginRequest } from '../models/interfaces/auth.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public farmaciaLogin(body: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/auth/login', body);
  }

}
