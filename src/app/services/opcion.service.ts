import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opcion } from '../models/opcion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  private urlListar = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/opcion/pregunta";
  private urlAcciones = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/opcion";
  private clientHttp = inject(HttpClient);

  obtenerListaOpcionesPorPregunta(id: number): Observable<Opcion[]>{
    return this.clientHttp.get<Opcion[]>(`${this.urlListar}/${id}`);
  }

  agregarOpcion(opcion: Opcion, idPregunta: number):Observable<Object>{
    return this.clientHttp.post(`${this.urlListar}/${idPregunta}`, opcion);
  }

  obtenerOpcionPorId(id: number){
    return this.clientHttp.get<Opcion>(`${this.urlAcciones}/${id}`);
  }

  editarOpcion(id: number, opcion: Opcion){
    return this.clientHttp.put(`${this.urlAcciones}/${id}`, opcion);
  }

  eliminarOpcion(id: number){
    return this.clientHttp.delete(`${this.urlAcciones}/${id}`)
  }
}
