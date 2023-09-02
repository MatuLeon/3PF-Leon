import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSuscription from './suscription.reducer';
import { state } from '@angular/animations';

export const selectSuscriptionState = createFeatureSelector<fromSuscription.State>(
  fromSuscription.suscriptionFeatureKey
);

export const SelectCurso = createSelector(selectSuscriptionState, (state)=> state.data)

export const selectAlumOption = createSelector(selectSuscriptionState, (state)=> state.alumnoOption)
export const selectCursoOption = createSelector(selectSuscriptionState, (state)=> state.cursoOption)
