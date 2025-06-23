import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Encuesta } from '../../../models/encuesta';
import { EncuestaService } from '../../../services/encuesta.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-editar-encuesta',
  imports: [FormsModule],
  templateUrl: './modal-editar-encuesta.component.html',
  styleUrl: './modal-editar-encuesta.component.css'
})
export class ModalEditarEncuestaComponent {
  @Input() encuestaId!: number;
  encuesta: Encuesta = new Encuesta();
  id!: number;
  nombreEncuesta: string = '';
  encuestaService = inject(EncuestaService);

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(){
    if (this.encuestaId) {
      this.encuestaService.obtenerEncuestaPorId(this.encuestaId).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.nombreEncuesta = datos.nombre_encuesta;
          this.encuesta = datos;
        },
        error: (error : any) => console.log(error)
      })
    }
  }


  editarEncuesta() {
    this.encuesta.nombre_encuesta = this.nombreEncuesta;
    this.encuestaService.editarEncuesta(this.encuesta.idEncuesta, this.encuesta).subscribe({
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
