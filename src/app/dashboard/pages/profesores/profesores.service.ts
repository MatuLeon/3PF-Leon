import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { CreateProfeData, DataProfesor } from './modal';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  private _profesores$ = new BehaviorSubject<DataProfesor[]>([]);
  private profesores$ = this._profesores$.asObservable();

  constructor() { }

  loadProfes(): void{
    this._profesores$.next([
      { 
        id: 1,
        name: "Jorge Perez",
        materia : "Angular",
        titulo: "Ingenierio Software"
      },      { 
        id: 2,
        name: "Miguel Aranda",
        materia : "Ingles Inicial",
        titulo: "Traductorado de Apple"
      },      { 
        id: 3,
        name: "Maria Silvina",
        materia : "Java Inicial",
        titulo: "Ingeniera software"
      },
    ])
  }

  getProfes():Observable<DataProfesor[]> {
    return this.profesores$
  }

  createProfe( profe : CreateProfeData):void{
    this.profesores$.pipe(take(1)).subscribe({
      next: (profesActuales)=>{
        this._profesores$.next([
          ...profesActuales,{
            ...profe, id : profesActuales.length + 1
          }
        ])
      }
    })
  }

  deleteById(id:number):void{
    this.profesores$.pipe(take(1)).subscribe({
      next: (arrayActual)=>{
        this._profesores$.next(arrayActual.filter((e) => e.id !== id))
      }
    })
  }
}
