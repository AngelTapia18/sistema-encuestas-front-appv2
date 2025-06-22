import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Opcion } from '../../../models/opcion';
import { Pregunta } from '../../../models/pregunta';
import { OpcionService } from '../../../services/opcion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-agregar-opcion',
  imports: [FormsModule],
  templateUrl: './modal-agregar-opcion.component.html',
  styleUrl: './modal-agregar-opcion.component.css'
})
export class ModalAgregarOpcionComponent {
  @Input() preguntaId!: number;
  opcion = new Opcion();
  pregunta: Pregunta = new Pregunta();
  nombreOpcion: string = '';
  opcionService = inject(OpcionService);
  constructor(public activeModal: NgbActiveModal) {}

  guardarOpcion() {
    this.opcion.nombre_opcion = this.nombreOpcion;
    this.pregunta.idPregunta = this.preguntaId;
    this.opcion.pregunta = this.pregunta;
    this.opcionService.agregarOpcion(this.opcion, this.preguntaId).subscribe({
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
