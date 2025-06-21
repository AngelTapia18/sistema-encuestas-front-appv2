import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private urlBase = "http://localhost:8080/sistema-encuestas-app/api/v1/encuestas";
  private clientHttp = inject(HttpClient);

  obtenerListaEncuestas(): Observable<Encuesta[]>{
    return this.clientHttp.get<Encuesta[]>(this.urlBase);
  }
}
