import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateCursoData, CursosData, UpdateCursoData } from '../model';
import { HttpErrorResponse } from '@angular/common/http';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursoss': emptyProps(),
    'Load Cursos Detail': props<{cursosId: number}>(),
    'Load Cursos Succes': props<{data: CursosData[]}>(),
    'Load Cursos Fail': props<{error: HttpErrorResponse}>(),

    'Create Cursos': props<{payload: CreateCursoData}>(),
    'Create Cursos Succes': props<{data: CursosData}>(),
    'Create Cursos Fail': props<{error: HttpErrorResponse}>(),

    'Edit Cursos': props<{payload: UpdateCursoData}>(),
    'Edit Cursos Succes': props<{data: Partial<CursosData>}>(),
    'Edit Cursos Fail': props<{error: HttpErrorResponse}>(),


    'Delete Cursos': props<{payload: UpdateCursoData}>(),
    'Delete Cursos Succes': props<{data: UpdateCursoData}>(),
    'Delete Cursos Fail': props<{error: HttpErrorResponse}>(),
  }
});
