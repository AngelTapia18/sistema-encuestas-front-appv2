import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';


@Component({
  selector: 'app-modal-agregar-encuesta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-agregar-encuesta.component.html',
  styleUrls: ['./modal-agregar-encuesta.component.css']
})
export class ModalAgregarEncuestaComponent {
  encuesta: Encuesta = new Encuesta();
  nombreEncuesta: string = '';

  private encuestaService = inject(EncuestaService);
  constructor(public activeModal: NgbActiveModal) {}

  guardarEncuesta() {
    this.encuesta.nombre_encuesta = this.nombreEncuesta;
    console.log(this.encuesta);
    this.encuestaService.agregarEncuesta(this.encuesta).subscribe({
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

  // irListaEncuestas() {
  //   this.enrutador.navigate(['/']);
  // }
}
