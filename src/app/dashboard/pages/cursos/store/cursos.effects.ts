import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CursosActions } from './cursos.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CreateCursoData, CursosData, UpdateCursoData } from '../model';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class CursosEffects {


  loadCursoss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursosActions.loadCursoss),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(()=> this.getCursosFromDB().pipe(
        map(data => CursosActions.loadCursosSucces({data})),
        catchError(error => of(CursosActions.loadCursosFail({error})))
      ))
    );
  });


  createCurso$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CursosActions.createCursos),
      concatMap((action) => this.createCurso(action.payload).pipe(
        map(data => CursosActions.createCursosSucces({data})),
        catchError(error => of (CursosActions.loadCursosFail({error})))
      ))
    )
  });


  createCursosSuccess$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CursosActions.createCursosSucces),
      map(()=> this.store.dispatch(CursosActions.loadCursoss()))
    )
  },{dispatch: false});


  editCurso$ = createEffect(() =>{
    return this.actions$.pipe(
      ofType(CursosActions.editCursos),
      concatMap((action)=>
      this.editCurso(action.payload).pipe(
        map(data =>CursosActions.editCursosSucces({data})),
        catchError(error => of (CursosActions.editCursosFail({error})))
      ))
    )
  })

  deleteCurso$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(CursosActions.deleteCursos),
      concatMap((action)=>
      this.deleteCurso(action.payload.id).pipe(
        map(data => CursosActions.deleteCursosSucces({data})),
        catchError(error => of (CursosActions.deleteCursosFail({error})))
      ))
    )
  })

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getCursosFromDB(): Observable<CursosData[]>{
    return this.httpClient.get<CursosData[]>(environment.baseApiUrl + '/cursos/');
  }

  private createCurso(payload: CreateCursoData): Observable<CursosData>{
    return this.httpClient.post<CursosData>(environment.baseApiUrl + '/cursos', payload);
  }

  private editCurso (payload: UpdateCursoData): Observable<UpdateCursoData>{
    return this.httpClient.put(environment.baseApiUrl + '/cursos/' + payload.id, payload);
  }

  private deleteCurso (id: number | undefined): Observable<any>{
    if ( id ===undefined){ throw Error};
    return this.httpClient.delete(environment.baseApiUrl + '/cursos/'+ id)
  }
  
}
