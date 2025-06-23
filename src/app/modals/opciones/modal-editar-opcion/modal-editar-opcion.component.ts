import { FormsModule } from '@angular/forms';
import { Component, inject, Input } from '@angular/core';
import { Opcion } from '../../../models/opcion';
import { OpcionService } from '../../../services/opcion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-editar-opcion',
  imports: [FormsModule],
  templateUrl: './modal-editar-opcion.component.html',
  styleUrl: './modal-editar-opcion.component.css'
})
export class ModalEditarOpcionComponent {
  @Input() opcionId!: number;
  opcion: Opcion = new Opcion();
  id!: number;
  nombreOpcion: string = '';
  opcionService = inject(OpcionService);

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(){
    if (this.opcionId) {
      this.opcionService.obtenerOpcionPorId(this.opcionId).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.opcion = datos;
          this.nombreOpcion = datos.nombre_opcion
        },
        error: (error : any) => console.log(error)
      })
    }
  }

  editarOpcion() {
    this.opcion.nombre_opcion = this.nombreOpcion;
    this.opcionService.editarOpcion(this.opcion.idOpcion, this.opcion).subscribe({
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
