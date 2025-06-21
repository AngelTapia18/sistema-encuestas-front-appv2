import { Routes } from '@angular/router';
import { ListadoEncuestasComponent } from './Listados/listado-encuestas/listado-encuestas.component';
import { ModalAgregarEncuestaComponent } from './modals/encuestas/modal-agregar-encuesta/modal-agregar-encuesta.component';

export const routes: Routes = [
  {path: 'listado-encuestas', component: ListadoEncuestasComponent},
  {path: '', redirectTo: 'listado-encuestas', pathMatch: 'full'},
];
