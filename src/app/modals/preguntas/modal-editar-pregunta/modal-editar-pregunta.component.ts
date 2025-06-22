import { Pregunta } from './../../../models/pregunta';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreguntaService } from '../../../services/pregunta.service';
import { FormsModule } from '@angular/forms';
import { Encuesta } from '../../../models/encuesta';

@Component({
  selector: 'app-modal-editar-pregunta',
  imports: [FormsModule],
  templateUrl: './modal-editar-pregunta.component.html',
  styleUrl: './modal-editar-pregunta.component.css'
})
export class ModalEditarPreguntaComponent {
  @Input() preguntaId!: number;
  pregunta: Pregunta = new Pregunta();
  id!: number;
  nombrePregunta: string = '';
  PreguntaService = inject(PreguntaService);

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(){
    if (this.preguntaId) {
      this.PreguntaService.obtenerPreguntaPorId(this.preguntaId).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.pregunta = datos;
          this.nombrePregunta = datos.nombre_pregunta
        },
        error: (error : any) => console.log(error)
      })
    }
  }

  editarPregunta() {
    this.pregunta.nombre_pregunta = this.nombrePregunta;
    this.PreguntaService.editarPregunta(this.pregunta.idPregunta, this.pregunta).subscribe({
      next: (datos) => {
        this.activeModal.close('Guardado');
        location.reload();
      },
      error: (error: any) =>{
        console.log(error);
      }
    })
  }
}
