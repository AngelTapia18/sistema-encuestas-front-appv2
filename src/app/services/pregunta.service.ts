import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pregunta } from '../models/pregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private urlListar = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/preguntas/encuesta";
  private urlAgregar = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/pregunta/encuesta";
  private urlAcciones = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/pregunta";
  private clientHttp = inject(HttpClient);

  obtenerListaPreguntasPorEncuesta(id: number): Observable<Pregunta[]>{
    return this.clientHttp.get<Pregunta[]>(`${this.urlListar}/${id}`);
  }

  agregarPregunta(pregunta: Pregunta, idEncuesta: number):Observable<Object>{
    return this.clientHttp.post(`${this.urlAgregar}/${idEncuesta}`, pregunta);
  }

  obtenerPreguntaPorId(id: number){
    return this.clientHttp.get<Pregunta>(`${this.urlAcciones}/${id}`);
  }

  editarPregunta(id: number, pregunta: Pregunta){
    return this.clientHttp.put(`${this.urlAcciones}/${id}`, pregunta);
  }

  eliminarPregunta(id: number){
    return this.clientHttp.delete(`${this.urlAcciones}/${id}`)
  }

}
