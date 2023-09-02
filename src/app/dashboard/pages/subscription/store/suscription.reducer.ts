import { createFeature, createReducer, on } from '@ngrx/store';
import { SuscriptionActions } from './suscription.actions';
import { SuscriptionWithCursoAndAlum } from '../model';
import { Alumnos } from '../../users/model';
import { CursosData } from '../../cursos/model';
import { state } from '@angular/animations';

export const suscriptionFeatureKey = 'suscription';

export interface State {
  data: SuscriptionWithCursoAndAlum[];
  alumnoOption: Alumnos[];
  loadingBuyerOptions: boolean;
  cursoOption: CursosData[];
  loading: boolean;
  error: unknown
}

export const initialState: State = {
  data: [],
  alumnoOption:[],
  cursoOption:[],
  loadingBuyerOptions: false,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(SuscriptionActions.loadSuscriptions, state => {
    return{
      ...state, 
      loading: true
    }
  }),
  on(SuscriptionActions.loadSuscriptionsSuccess, (state, action) => {
    return{
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(SuscriptionActions.loadSuscriptionsFailure, (state, action) => {
    return{
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(SuscriptionActions.loadAlumnoOptions, (state)=>state),
  on(SuscriptionActions.loadAlumnoOptionSuccess, (state,action)=>{
    return{
      ...state,
      alumnoOption: action.data
    }
  }),
  on(SuscriptionActions.loadCursoOptions, (state)=>state),
  on(SuscriptionActions.loadCursoOptionSuccess, (state,action)=>{
    return{
      ...state,
      cursoOption: action.data
    }
  })





);


export const suscriptionFeature = createFeature({
  name: suscriptionFeatureKey,
  reducer,
});

