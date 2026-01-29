import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  
  constructor(private http: HttpClient) {}

  private apiESDLA = environment.apiESDLA;
  getAllPersonajes(): Observable<any []> {
    return this.http.get<any[]>(`${this.apiESDLA}listaPersonajes`);
  }

  deletePersonaje(id:number): Observable<any> {
    return this.http.delete<any>(`${this.apiESDLA}borrarPersonaje/${id}`);
  }

  insertarPersonaje(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiESDLA}insertarPersonaje`, data);
  }

  actualizarPersonaje(id:number, data:any): Observable<any> {
    return this.http.put<any>(`${this.apiESDLA}actualizarPersonaje/${id}`, data);
  }

  getPersonaje(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiESDLA}obtenerPersonaje/${id}`);
  }
}