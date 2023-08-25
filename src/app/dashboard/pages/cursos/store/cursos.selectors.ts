import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<fromCursos.State>(
  fromCursos.cursosFeatureKey
);


export const selectCursosArray = createSelector(selectCursosState, (state)=>state.cursos)