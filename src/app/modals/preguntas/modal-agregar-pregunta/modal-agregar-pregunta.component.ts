import { Component, inject, Input } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Encuesta } from '../../../models/encuesta';

@Component({
  selector: 'app-modal-agregar-pregunta',
  imports: [FormsModule],
  templateUrl: './modal-agregar-pregunta.component.html',
  styleUrl: './modal-agregar-pregunta.component.css'
})
export class ModalAgregarPreguntaComponent {
  @Input() encuestaId!: number;
  encuesta = new Encuesta();
  pregunta: Pregunta = new Pregunta();
  nombrePregunta: string = '';

  private preguntaService = inject(PreguntaService);
  constructor(public activeModal: NgbActiveModal) {}

  guardarPregunta() {
    this.pregunta.nombre_pregunta = this.nombrePregunta;
    this.encuesta.idEncuesta = this.encuestaId;
    this.pregunta.encuesta = this.encuesta;
    this.preguntaService.agregarPregunta(this.pregunta, this.encuestaId).subscribe({
      next: (datos) => {
        // this.irListaEncuestas();
        this.activeModal.close('Guardado');
        location.reload();
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
  }

}
