import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SuscriptionWithCursoAndAlum } from '../model';
import { HttpErrorResponse } from '@angular/common/http';
import { CursosData } from '../../cursos/model';
import { Alumnos } from '../../users/model';

export const SuscriptionActions = createActionGroup({
  source: 'Suscription',
  events: {
    'Load Suscriptions': emptyProps(),
    'Load Suscriptions Success': props<{ data: SuscriptionWithCursoAndAlum[] }>(),
    'Load Suscriptions Failure': props<{ error: HttpErrorResponse }>(),

    'Load Curso Options': emptyProps(),
    'Load Curso Option Success': props<{data: CursosData[]}>(),
    'Load Curso Option Failure': props<{ error: HttpErrorResponse }>(),

    'Load Alumno Options': emptyProps(),
    'Load Alumno Option Success': props<{data: Alumnos[]}>(),
    'Load Alumno Option Failure': props<{ error: HttpErrorResponse }>(),
  }
});
