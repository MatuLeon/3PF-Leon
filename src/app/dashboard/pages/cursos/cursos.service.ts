import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Cursos, createCursoData } from './model';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos$ = new BehaviorSubject<Cursos[]>([]);
  
  constructor(private notifier: NotifierService) {

  }

  getCursos():Observable<Cursos[]>{
    return this.cursos$.asObservable()
  }

  loadCursos(): void{
    this.cursos$.next([
      {
        id: 1,
        name: 'Angular',
        description: 'Aprenderas a usar Angular para el desarrollo de SLP',
        price:  332.4
      },
      {
        id: 2,
        name: 'Desarrollo Web',
        description: 'Adentrate en el mundo de desarrollo web, con este curso inicial',
        price:  224,
      },
      {        
        id: 3,
        name: 'Ingles inicial',
        description: 'Aprende ingles, en este curso grupal e interactivo',
        price:  144,
      }
    ])
  }

  createCurso(curso : createCursoData):void{
      this.cursos$.pipe(take(1)).subscribe({
        next: (arrayActual) =>{
          this.cursos$.next([
            ...arrayActual,{
              id: arrayActual.length + 1,
              name: 'Random',
              description: 'Random description',
              price: 99999
            }
          ]);
          this.notifier.showSucces('Curso guardado')
        }
      })
  }

  deleteById(id:number):void{
    this.cursos$.pipe(take(1)).subscribe({
      next:(arrayActual)=>{
        this.cursos$.next(
          arrayActual.filter((c)=> c.id !== id)
          );
      }
    })
  }
}
