import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';
import { Pregunta } from '../../models/pregunta';
import { ModalAgregarPreguntaComponent } from '../../modals/preguntas/modal-agregar-pregunta/modal-agregar-pregunta.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditarPreguntaComponent } from '../../modals/preguntas/modal-editar-pregunta/modal-editar-pregunta.component';
import { ModalBorrarPreguntaComponent } from '../../modals/preguntas/modal-borrar-pregunta/modal-borrar-pregunta.component';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-listado-preguntas',
  imports: [],
  templateUrl: './listado-preguntas.component.html',
  styleUrl: './listado-preguntas.component.css'
})
export class ListadoPreguntasComponent {
  preguntas!: Pregunta[];
  enrutador = inject(Router);
  ruta = inject(ActivatedRoute);
  idEncuesta!: number;
  nombreEncuesta!: string;
  PreguntasServicio = inject(PreguntaService);
  encuestaService = inject(EncuestaService);

  constructor(private modalService: NgbModal) {}

  ngOnInit(){
    this.idEncuesta = this.ruta.snapshot.params['idEncuesta'];
    this.ObtenerDatosEncuesta(this.idEncuesta);
    if (this.idEncuesta) {
      this.obtenerPreguntasPorEncuesta(this.idEncuesta);
    }
  }

  obtenerPreguntasPorEncuesta(id:number ):void {
    this.PreguntasServicio.obtenerListaPreguntasPorEncuesta(id).subscribe(
      {
        next:(datos)=> this.preguntas = datos,
        error:(error) => console.error("Error al obtener los preguntas", error)
      }
    );
  }

  ObtenerDatosEncuesta(idEncuesta: number){
    this.encuestaService.obtenerEncuestaPorId(this.idEncuesta).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.nombreEncuesta = datos.nombre_encuesta;
        },
        error: (error : any) => console.log(error)
      })
  }

  ModalAgregarPreguntas() {
    const modalRef = this.modalService.open(ModalAgregarPreguntaComponent);
    modalRef.componentInstance.encuestaId = this.idEncuesta;
  }

  ModalEditarPregunta(id: number) {
    const modalRef =  this.modalService.open(ModalEditarPreguntaComponent);
    modalRef.componentInstance.preguntaId = id;
  }
  ModalEliminarPregunta(id: number) {
    const modalRef =  this.modalService.open(ModalBorrarPreguntaComponent);
    modalRef.componentInstance.preguntaId = id;
  }

  agregarOpciones(idEncuesta: number, preguntaId: number) {
    this.enrutador.navigate(['/listado-opciones',idEncuesta, preguntaId]);
  }

  volverAEncuestas() {
    this.enrutador.navigate(['/listado-encuestas']);
  }
}
