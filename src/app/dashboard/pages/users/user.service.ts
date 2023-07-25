import { Injectable } from '@angular/core';
import { Alumnos } from './model';
import { BehaviorSubject, Observable, Subject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private alumnos : Alumnos[] = [
    {
      id: 1,
      name : 'Carla',
      lastname : 'Fernandez',
      email : 'carf@mail.com',
      password : '231231',
      nota : '7'
    },
    {
      id : 2,
      name: 'Matias',
      lastname: 'Leon',
      email: 'mat@hotmail.com',
      password: '2929292',
      nota : '9'
    },
    {
      id : 3,
      name: 'Miguel',
      lastname: 'Sanueza',
      email: 'migue@hotmail.com',
      password: '2556292',
      nota : '3'
    },
    {
      id : 4,
      name: 'David',
      lastname: 'Ortiz',
      email: 'ortizDavid@hotmail.com',
      password: '468555',
      nota : '5'
    },
    {
      id : 5,
      name: 'Daniela',
      lastname: 'Gomez',
      email: 'daniGo@hotmail.com',
      password: '125239',
      nota : '8'
    }
  ]

  private sendNotification$ = new Subject<string>();

  //Usar $ AL FINAL PARA SABER QUE ES UN OBSERVABLE
  private _alumnos$ = new BehaviorSubject<Alumnos[]>([]);
  private alumnos$ = this._alumnos$.asObservable()


  constructor() { 
    this.sendNotification$.subscribe({
      next : (message) => alert(message)
    })
  }

  sendNotification ( notification : string): void{
    this.sendNotification$.next(notification)
  }

  
  loadAlumnos(): void{
    this._alumnos$.next(this.alumnos)
  }

  getAlumnos(): Observable<Alumnos[]>{
    // return this.alumnos
    return this.alumnos$;
  }

  createAlumno(alumno : Alumnos):void {
    this.alumnos = [
      ...this.alumnos,
      alumno,
    ]
  }


}
