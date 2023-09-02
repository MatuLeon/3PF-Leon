import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { SuscriptionActions } from './suscription.actions';
import { HttpClient } from '@angular/common/http';
import { SuscriptionWithCursoAndAlum } from '../model';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../../users/user.service';
import { Alumnos } from '../../users/model';
import { CursosData } from '../../cursos/model';


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

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
  private getSuscriptionFromDB(): Observable<SuscriptionWithCursoAndAlum[]>{
    return this.httpClient.get<SuscriptionWithCursoAndAlum[]>(environment.baseApiUrl + '/subscription?_expand=curso&_expand=users')
  }


  private getAlumnoOption(): Observable<Alumnos[]>{
    return this.httpClient.get<Alumnos[]>(environment.baseApiUrl + '/users')
  }

  private getCursoOption(): Observable<CursosData[]>{
    return this.httpClient.get<CursosData[]>(environment.baseApiUrl + '/cursos')
  }
}
