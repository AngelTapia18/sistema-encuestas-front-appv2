import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private urlBase = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/encuestas";
  private urlAcciones = "https://sistemaencuestasapp.uc.r.appspot.com/sistema-encuestas-app/api/v1/encuesta";
  private clientHttp = inject(HttpClient);

  obtenerListaEncuestas(): Observable<Encuesta[]>{
    return this.clientHttp.get<Encuesta[]>(this.urlBase);
  }
  agregarEncuesta(encuesta: Encuesta):Observable<Object>{
    return this.clientHttp.post(this.urlAcciones, encuesta);
  }

  obtenerEncuestaPorId(id: number){
    return this.clientHttp.get<Encuesta>(`${this.urlAcciones}/${id}`);
  }

  editarEncuesta(id: number, encuesta: Encuesta){
    return this.clientHttp.put(`${this.urlAcciones}/${id}`, encuesta);
  }

  eliminarEncuesta(id: number){
    return this.clientHttp.delete(`${this.urlAcciones}/${id}`)
  }

}
