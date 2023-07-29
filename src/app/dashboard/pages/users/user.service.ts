import { Injectable } from '@angular/core';
import { Alumnos, CreateAlumnoData, UpdateAlumnoData } from './model';
import { BehaviorSubject, Observable, Subject, delay, of, take} from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';


const alumno_DB : Observable<Alumnos[]> = of([
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
]).pipe(delay(1500))

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private alumnos : Alumnos[]=[]

  private sendNotification$ = new Subject<string>();

  //Usar $ AL FINAL PARA SABER QUE ES UN OBSERVABLE
  private _alumnos$ = new BehaviorSubject<Alumnos[]>([]);
  private alumnos$ = this._alumnos$.asObservable()


  constructor(private notifier : NotifierService) { 
    this.sendNotification$.subscribe({
      next : (message) => alert(message)
    })
  }

  sendNotification ( notification : string): void{
    this.sendNotification$.next(notification)
  }

  
  loadAlumnos(): void{
    alumno_DB.subscribe({
      next: (alumnosFromDB) => this._alumnos$.next(alumnosFromDB)
    })
  }

  getAlumnos(): Observable<Alumnos[]>{
    // return this.alumnos
    return this.alumnos$;
  }

  createAlumno(alumno : CreateAlumnoData):void {
    this._alumnos$.pipe(take(1)).subscribe({
      next: (alumnosActuales)=>{
        this._alumnos$.next 
        ([...alumnosActuales,
          {
          ...alumno, id : alumnosActuales.length + 1}
        ]);
        this.notifier.showSucces('Alumno guardado correctamente')
      }
    })
  }


  updateAlumnoByID (id: number, alumnoActualizado : UpdateAlumnoData):void{
    this.alumnos$.pipe(take(1)).subscribe({
      next: (idActual) =>{
        this._alumnos$.next(
          idActual.map((a) => a.id === id ? {...a, ...alumnoActualizado} : a)
        );
      }
    })
  }

  deleteAlumnoById( id: number):void{
    this._alumnos$.subscribe({
      next: (arrayActual) => {this._alumnos$.next(arrayActual.filter((a) => a.id !== id))
      this.notifier.showSucces('Alumno eliminado')}
    })
  }

}
