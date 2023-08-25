import { createFeature, createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { CursosData } from '../model';
import { cursos_MOCK } from '../mocks';

export const cursosFeatureKey = 'cursos';

export interface State {
  cursos: CursosData[],
  cursoDetail: CursosData | null
}

export const initialState: State = {
  cursos: [],
  cursoDetail: null
};

export const reducer = createReducer(
  initialState,

  on(CursosActions.loadCursoss, state => {
    return{
      ...state,
      cursos: cursos_MOCK
    }
  }),

  on(CursosActions.loadCursosDetail,(state, action)=>{
    return{
      ...state,
      cursoDetail:cursos_MOCK.find((c)=> c.id == action.cursosId) || null
    }
  })

);

export const cursosFeature = createFeature({
  name: cursosFeatureKey,
  reducer,
});

