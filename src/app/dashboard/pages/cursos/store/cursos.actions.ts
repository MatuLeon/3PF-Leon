import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CursosActions = createActionGroup({
  source: 'Cursos',
  events: {
    'Load Cursoss': emptyProps(),
    'Load Cursos Detail': props<{cursosId: number}>()
  }
});
