import { Component, inject } from '@angular/core';
import { Encuesta } from '../../models/encuesta';
import { EncuestaService } from '../../services/encuesta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgregarEncuestaComponent } from '../../modals/encuestas/modal-agregar-encuesta/modal-agregar-encuesta.component';
import { ModalEditarEncuestaComponent } from '../../modals/encuestas/modal-editar-encuesta/modal-editar-encuesta.component';
import { ModalBorrarEncuestaComponent } from '../../modals/encuestas/modal-borrar-encuesta/modal-borrar-encuesta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-encuestas',
  imports: [],
  templateUrl: './listado-encuestas.component.html',
  styleUrl: './listado-encuestas.component.css'
})
export class ListadoEncuestasComponent {
  encuestas!: Encuesta[];
  nombreencuestas: string[] = [];
  EncuestaServicio = inject(EncuestaService);
  enrutador = inject(Router);

  constructor(private modalService: NgbModal) {}

  ngOnInit(){
    this.obtenerEncuestas();
  }

  private obtenerEncuestas():void {
    this.EncuestaServicio.obtenerListaEncuestas().subscribe(
      {
        next:(datos)=> this.encuestas = datos,
        error:(error) => console.error("Error al obtener los encuestas", error)
      }
    );
  }

  ModalAgregarEncuesta() {
    this.modalService.open(ModalAgregarEncuestaComponent);
  }

  ModalEditarEncuesta(id: number) {
    const modalRef =  this.modalService.open(ModalEditarEncuestaComponent);
    modalRef.componentInstance.encuestaId = id;
  }
  ModalEliminarEncuesta(id: number) {
    const modalRef =  this.modalService.open(ModalBorrarEncuestaComponent);
    modalRef.componentInstance.encuestaId = id;
  }

  agregarPreguntas(id: number) {
    this.enrutador.navigate(['listado-preguntas',id]);
  }

}
