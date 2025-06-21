import { Component } from '@angular/core';
import { ListadoEncuestasComponent } from "./Listados/listado-encuestas/listado-encuestas.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistema-encuestas-app';
}
