import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Microscopio } from '../models/microscopio.model';

@Injectable({
  providedIn: 'root'
})
export class MicroscopioService {
  private readonly apiUrl = 'http://localhost:8080/api-upc';

  constructor(private http: HttpClient) {}

  listar(): Observable<Microscopio[]> {
    return this.http.get<Microscopio[]>(`${this.apiUrl}/microscopios`);
  }

  crear(microscopio: Microscopio): Observable<Microscopio> {
    return this.http.post<Microscopio>(`${this.apiUrl}/microscopio`, microscopio);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/microscopio/${id}`);
  }

  obtenerPorId(id: number): Observable<Microscopio> {
    return this.http.get<Microscopio>(`${this.apiUrl}/microscopio/${id}`);
  }

  actualizar(id: number, microscopio: Microscopio): Observable<Microscopio> {
    return this.http.put<Microscopio>(`${this.apiUrl}/microscopio/${id}`, microscopio);
  }
}
