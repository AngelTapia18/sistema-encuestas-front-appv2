import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';

@Component({
  selector: 'app-modal-borrar-encuesta',
  imports: [FormsModule],
  templateUrl: './modal-borrar-encuesta.component.html',
  styleUrl: './modal-borrar-encuesta.component.css'
})
export class ModalBorrarEncuestaComponent {

  @Input() encuestaId!: number;
  encuesta: Encuesta = new Encuesta();
  id!: number;
  encuestaService = inject(EncuestaService);

  constructor(public activeModal: NgbActiveModal) {}

  eliminarEncuesta() {
    this.encuestaService.eliminarEncuesta(this.encuestaId).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.activeModal.close('Guardado');
          location.reload();
        },
        error: (error : any) => console.log(error)
      })
  }

}
