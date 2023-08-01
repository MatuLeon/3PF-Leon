import { Injectable } from '@angular/core';
import { Alumnos, CreateAlumnoData, UpdateAlumnoData } from './model';
import { BehaviorSubject, Observable, Subject, delay, map, of, take} from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';


const alumno_DB : Observable<Alumnos[]> = of([
  {
    id: 1,
    name : 'Carla',
    lastname : 'Fernandez',
    email : 'carf@mail.com',
    password : '231231',
    curso : 'Angular'
  },
  {
    id : 2,
    name: 'Matias',
    lastname: 'Leon',
    email: 'mat@hotmail.com',
    password: '2929292',
    curso : 'Desarrollo Web'
  },
  {
    id : 3,
    name: 'Miguel',
    lastname: 'Sanueza',
    email: 'migue@hotmail.com',
    password: '2556292',
    curso : 'Aprendiendo a aprender'
  },
  {
    id : 4,
    name: 'David',
    lastname: 'Ortiz',
    email: 'ortizDavid@hotmail.com',
    password: '468555',
    curso : 'Ingles inicial'
  },
  {
    id : 5,
    name: 'Daniela',
    lastname: 'Gomez',
    email: 'daniGo@hotmail.com',
    password: '125239',
    curso : 'Java inicial'
  }
]).pipe(delay(1500))

@Injectable({
  providedIn: 'root'
})
export class UserService {


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

  getAlumnoByID ( id : number): Observable <Alumnos|undefined>{
    return this.alumnos$.pipe(
      map((alum)=> alum.find((u) => u.id === id)),
      take(1)
    )
  }

  deleteAlumnoById( id: number):void{
    this._alumnos$.subscribe({
      next: (arrayActual) => {this._alumnos$.next(arrayActual.filter((a) => a.id !== id))
      this.notifier.showSucces('Alumno eliminado')}
    })
  }

}
