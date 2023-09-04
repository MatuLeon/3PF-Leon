import { Alumnos } from "../../users/model";
import { CursosData } from "../../cursos/model";


export interface Suscripcion{
    id: number;
    cursoId: number;
    alumnoId: number;
}

export interface SuscriptionWithCursoAndAlum extends Suscripcion{
    curso: CursosData;
    alumno: Alumnos;
}

export interface CreateSuscripcion{
    alumnoId: number | null;
    cursoId: number | null;
}