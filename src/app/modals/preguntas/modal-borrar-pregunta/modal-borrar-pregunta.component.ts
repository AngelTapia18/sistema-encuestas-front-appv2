import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-borrar-pregunta',
  imports: [FormsModule],
  templateUrl: './modal-borrar-pregunta.component.html',
  styleUrl: './modal-borrar-pregunta.component.css'
})
export class ModalBorrarPreguntaComponent {
  @Input() preguntaId!: number;
  pregunta: Pregunta = new Pregunta();
  preguntaService = inject(PreguntaService);

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(){
    console.log(this.preguntaId)
  }

  eliminarPregunta() {
    this.preguntaService.eliminarPregunta(this.preguntaId).subscribe({
        next: (datos) =>{
          console.log(datos);
          this.activeModal.close('Guardado');
          location.reload();
        },
        error: (error : any) => console.log(error)
      })
  }

}
