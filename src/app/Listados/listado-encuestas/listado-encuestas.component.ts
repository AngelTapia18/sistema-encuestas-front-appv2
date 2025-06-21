import { Component, inject } from '@angular/core';
import { Encuesta } from '../../models/encuesta';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-listado-encuestas',
  imports: [],
  templateUrl: './listado-encuestas.component.html',
  styleUrl: './listado-encuestas.component.css'
})
export class ListadoEncuestasComponent {
  encuestas!: Encuesta[];

  private EncuestaServicio = inject(EncuestaService);

  ngOnInit(){
    this.obtenerEncuestas();
  }

  private obtenerEncuestas():void {
    this.EncuestaServicio.obtenerListaEncuestas().subscribe(
      {
        next:(datos)=>{
          this.encuestas = datos;
        },
        error:(error) => {

          console.error("Error al obtener los encuestas", error);
        }
      }
    );
  }
}
