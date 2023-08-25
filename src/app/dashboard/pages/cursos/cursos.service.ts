import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CreateCursoData, CursosData } from './model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private _cursos$ = new BehaviorSubject<CursosData[]> ([]);
  private cursos$ = this._cursos$.asObservable()

  constructor() {  }



  loadCursos(): void{
    this._cursos$.next([
      {
        id: 1,
        name: 'Ingles inicial',
        description: 'Aprende ingles hasta B1',
        price: 211,
      },
      {
        id: 2,
        name: 'Java inicial',
        description: 'Programacion backend',
        price: 448,
      },
      {
        id: 3,
        name: 'Angular',
        description: 'Adentrate en el mundo de Angular',
        price: 655,
      },
    ])
  }

  getCursos(): Observable<CursosData[]> {
    return this.cursos$;
  };
  createCurso( curso : CreateCursoData) : void{
    this.cursos$.pipe(take(1)).subscribe({
      next: (cursosActuales)=>{
        this._cursos$.next([
          ...cursosActuales,
          {
            ...curso, id: cursosActuales.length +1
          }
        ]);
      }
    })
  }


  deleteById(id:number): void {
    this.cursos$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._cursos$.next(arrayActual.filter((e) => e.id !==id)
        );
      }
    })
  }
}
