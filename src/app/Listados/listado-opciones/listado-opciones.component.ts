import { OpcionService } from './../../services/opcion.service';
import { Component, inject } from '@angular/core';
import { Opcion } from '../../models/opcion';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAgregarOpcionComponent } from '../../modals/opciones/modal-agregar-opcion/modal-agregar-opcion.component';
import { ModalEditarOpcionComponent } from '../../modals/opciones/modal-editar-opcion/modal-editar-opcion.component';
import { ModalBorrarOpcionComponent } from '../../modals/opciones/modal-borrar-opcion/modal-borrar-opcion.component';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-listado-opciones',
  imports: [],
  templateUrl: './listado-opciones.component.html',
  styleUrl: './listado-opciones.component.css'
})
export class ListadoOpcionesComponent {
  opciones!: Opcion[];
  enrutador = inject(Router);
  ruta = inject(ActivatedRoute);
  idPregunta!: number;
  idEncuesta!: number;
  nombrePregunta!: string;
  opcionService = inject(OpcionService);
  preguntasService = inject(PreguntaService);

  constructor(private modalService: NgbModal) {}

  ngOnInit(){
    this.idEncuesta = this.ruta.snapshot.params['idEncuesta'];
    this.idPregunta = this.ruta.snapshot.params['idPregunta'];
    this.ObtenerDatosPregunta(this.idPregunta);
    if (this.idPregunta) {
      this.obtenerOpcionesPorPregunta(this.idPregunta);
    }
  }

  obtenerOpcionesPorPregunta(id:number ):void {
    this.opcionService.obtenerListaOpcionesPorPregunta(id).subscribe(
      {
        next:(datos)=> this.opciones = datos,
        error:(error) => console.error("Error al obtener los opciones", error)
      }
    );
  }

  ObtenerDatosPregunta(idPregunta: number){
    this.preguntasService.obtenerPreguntaPorId(this.idPregunta).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.nombrePregunta = datos.nombre_pregunta;
        },
        error: (error : any) => console.log(error)
      })
  }

  ModalAgregarOpcion() {
    const modalRef = this.modalService.open(ModalAgregarOpcionComponent);
    modalRef.componentInstance.preguntaId = this.idPregunta;
  }

  ModalEditarOpcion(id: number) {
    const modalRef =  this.modalService.open(ModalEditarOpcionComponent);
    modalRef.componentInstance.opcionId = id;
  }
  ModalEliminarOpcion(id: number) {
    const modalRef =  this.modalService.open(ModalBorrarOpcionComponent);
    modalRef.componentInstance.opcionId = id;
  }

  volverAPreguntas(idEncuesta: number) {
    this.enrutador.navigate(['listado-preguntas/',idEncuesta]);
  }
}
