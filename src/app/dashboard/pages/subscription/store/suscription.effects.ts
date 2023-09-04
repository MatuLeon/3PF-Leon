import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SuscriptionActions } from './suscription.actions';
import { HttpClient } from '@angular/common/http';
import { CreateSuscripcion, Suscripcion, SuscriptionWithCursoAndAlum } from '../model';
import { environment } from 'src/environments/environment.prod';
import { Alumnos } from '../../users/model';
import { CursosData } from '../../cursos/model';
import { Store } from '@ngrx/store';


@Injectable()
export class SuscriptionEffects {

  ySuscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SuscriptionActions.loadSuscriptions),
      concatMap(() =>
        this.getSuscriptionFromDB().pipe(
          map(data => SuscriptionActions.loadSuscriptionsSuccess({ data })),
          catchError(error => of(SuscriptionActions.loadSuscriptionsFailure({ error }))))
      ) 
    );
  });



  loadAlumnoOption$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SuscriptionActions.loadAlumnoOptions),
      concatMap(() =>
        this.getAlumnoOption().pipe(
          map(data => SuscriptionActions.loadAlumnoOptionSuccess({ data })),
          catchError(error => of(SuscriptionActions.loadAlumnoOptionFailure({ error }))))
      ) 
    );
  });

  loadCursoOption$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SuscriptionActions.loadCursoOptions),
      concatMap(() =>
        this.getCursoOption().pipe(
          map(data => SuscriptionActions.loadCursoOptionSuccess({ data })),
          catchError(error => of(SuscriptionActions.loadCursoOptionFailure({ error }))))
      ) 
    );
  });



  createSuscripcion$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SuscriptionActions.createSuscripcion),
      concatMap((action) =>
        this.createSuscription(action.payload).pipe(
          map(data => SuscriptionActions.createSuscripcionSuccess({ data })),
          catchError(error => of(SuscriptionActions.createSuscripcionFailure({ error }))))
      ) 
    );
  });



  createSuscripcionSucess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(SuscriptionActions.createSuscripcionSuccess),
      map(()=>this.store.dispatch(SuscriptionActions.loadSuscriptions()))
    );
  }, {dispatch: false});

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}
  private getSuscriptionFromDB(): Observable<SuscriptionWithCursoAndAlum[]>{
    return this.httpClient.get<SuscriptionWithCursoAndAlum[]>(environment.baseApiUrl + '/subscription?_expand=curso&_expand=alumno')
  }


  private getAlumnoOption(): Observable<Alumnos[]>{
    return this.httpClient.get<Alumnos[]>(environment.baseApiUrl + '/users')
  }

  private getCursoOption(): Observable<CursosData[]>{
    return this.httpClient.get<CursosData[]>(environment.baseApiUrl + '/cursos')
  }

  private createSuscription(payload : CreateSuscripcion): Observable<Suscripcion>{
    return this.httpClient.post<Suscripcion>(environment.baseApiUrl + '/subscription', payload)
  }
}
