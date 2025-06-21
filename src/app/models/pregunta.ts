import { Encuesta } from "./encuesta";

export class Pregunta {
  idPregunta!: number;
  nombre_pregunta!: string;
  encuesta!: Encuesta;
}
