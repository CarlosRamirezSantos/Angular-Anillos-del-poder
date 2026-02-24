import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  obtenerPregunta(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtenerPregunta/${id}`);
  }

  comprobarRespuesta(idPregunta: number, respuestaUsuario: number): Observable<boolean> {
    
    return this.http.get<boolean>(`${this.apiUrl}/respuesta/${idPregunta}/?respuestaUsuario=${respuestaUsuario}`);
  }

  empezarPartida(): Observable<any> {
    
    return this.http.get<any>(`${this.apiUrl}/empezarPartida/`);
  }

  sumarAcierto(idPartida: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/correcta/${idPartida}/`, {});
  }

  finalizarPartida(idPartida: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/finalizar/${idPartida}/`, {});
  }
}