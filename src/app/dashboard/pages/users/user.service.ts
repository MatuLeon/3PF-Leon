import { Injectable } from '@angular/core';
import { Alumnos, CreateAlumnoData, UpdateAlumnoData } from './model';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take} from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sendNotification$ = new Subject<string>();
  //Usar $ AL FINAL PARA SABER QUE ES UN OBSERVABLE
  private _alumnos$ = new BehaviorSubject<Alumnos[]>([]);
  private alumnos$ = this._alumnos$.asObservable()


  constructor(private notifier : NotifierService, private httpCliente : HttpClient) { 
    this.sendNotification$.subscribe({
      next : (message) => alert(message)
    })
  }

  sendNotification ( notification : string): void{
    this.sendNotification$.next(notification)
  }

  
  loadAlumnos(): void{
    // alumno_DB.subscribe({
    //   next: (alumnosFromDB) => this._alumnos$.next(alumnosFromDB)
    // })
    this.httpCliente.get<Alumnos[]>('http://localhost:3000/users',{
      headers: new HttpHeaders({
        'token': '123'
      })
    }
    
    )
    .subscribe({
      next: (response) => {
        this._alumnos$.next(response)
      },
      error: ()=>{
        this.notifier.showError('Error al cargar los usuarios')
      }
    })
  }

  getAlumnos(): Observable<Alumnos[]>{
    // return this.alumnos
    return this.alumnos$;
  }

  createAlumno(alumno : CreateAlumnoData):void {
    // this._alumnos$.pipe(take(1)).subscribe({
    //   next: (alumnosActuales)=>{
    //     this._alumnos$.next 
    //     ([...alumnosActuales,
    //       {
    //       ...alumno, id : alumnosActuales.length + 1}
    //     ]);
    //     this.notifier.showSucces('Alumno guardado correctamente')
    //   }
    // })
    this.httpCliente.post<Alumnos>('http://localhost:3000/users', alumno)
    .pipe(
      mergeMap((alumnoCreate)=>
        this.alumnos$.pipe(take(1), 
        map(
          (arrayActual)=> [...arrayActual, alumnoCreate])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) =>{
        this._alumnos$.next(arrayActualizado);
      }
    })
  }


  updateAlumnoByID (id: number, alumnoActualizado : UpdateAlumnoData):void{
    // this.alumnos$.pipe(take(1)).subscribe({
    //   next: (idActual) =>{
    //     this._alumnos$.next(
    //       idActual.map((a) => a.id === id ? {...a, ...alumnoActualizado} : a)
    //     );
    //   }
    // })

    this.httpCliente.put('http://localhost:3000/users/' + id, alumnoActualizado)
    .subscribe({
      next: ()=>this.loadAlumnos()
    })
  }

  getAlumnoByID ( id : number): Observable <Alumnos|undefined>{
    return this.alumnos$.pipe(
      map((alum)=> alum.find((u) => u.id === id)),
      take(1)
    )
  }

  deleteAlumnoById( id: number):void{
    // this._alumnos$.subscribe({
    //   next: (arrayActual) => {this._alumnos$.next(arrayActual.filter((a) => a.id !== id))
    //   this.notifier.showSucces('Alumno eliminado')}
    // })

    
    this.httpCliente.delete('http://localhost:3000/users/' + id )
    .pipe(
      mergeMap(
        (responseAlumEliminado) => this.alumnos$.pipe
          (take(1), map 
            (
              (arrayActual)=>arrayActual.filter((a) => a.id !== id)
            )
          )
      )
    ).subscribe({
      next: (arrayActualizado) => this._alumnos$.next(arrayActualizado)
    })

    this.alumnos$.pipe(take(1))
  }
  
}
