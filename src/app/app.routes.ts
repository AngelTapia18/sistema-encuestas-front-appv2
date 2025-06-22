import { ListadoOpcionesComponent } from './Listados/listado-opciones/listado-opciones.component';
import { Routes } from '@angular/router';
import { ListadoEncuestasComponent } from './Listados/listado-encuestas/listado-encuestas.component';
import { ListadoPreguntasComponent } from './Listados/listado-preguntas/listado-preguntas.component';

export const routes: Routes = [
  {path: 'listado-encuestas', component: ListadoEncuestasComponent},
  {path: '', redirectTo: 'listado-encuestas', pathMatch: 'full'},
  {path: 'listado-preguntas/:idEncuesta', component: ListadoPreguntasComponent},
  {path: 'listado-opciones/:idEncuesta/:idPregunta', component: ListadoOpcionesComponent},
];

