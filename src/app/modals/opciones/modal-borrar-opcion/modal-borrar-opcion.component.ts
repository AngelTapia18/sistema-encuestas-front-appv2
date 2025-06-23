import { Component, inject, Input } from '@angular/core';
import { Opcion } from '../../../models/opcion';
import { OpcionService } from '../../../services/opcion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-borrar-opcion',
  imports: [],
  templateUrl: './modal-borrar-opcion.component.html',
  styleUrl: './modal-borrar-opcion.component.css'
})
export class ModalBorrarOpcionComponent {
  @Input() opcionId!: number;
  opcion: Opcion = new Opcion();
  opcionService = inject(OpcionService);

  constructor(public activeModal: NgbActiveModal) {}

  eliminarOpcion() {
    this.opcionService.eliminarOpcion(this.opcionId).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.activeModal.close('Guardado');
          location.reload();
        },
        error: (error : any) => console.log(error)
      })
  }
}
