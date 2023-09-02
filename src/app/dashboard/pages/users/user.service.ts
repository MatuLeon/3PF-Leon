import { Injectable } from '@angular/core';
import { Alumnos, CreateAlumnoData, UpdateAlumnoData } from './model';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take} from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sendNotification$ = new Subject<string>();
  private _alumnos$ = new BehaviorSubject<Alumnos[]>([]);
  public alumnos$ = this._alumnos$.asObservable()

  constructor(private notifier : NotifierService, private httpCliente : HttpClient, private http : HttpClient) { 
    this.sendNotification$.subscribe({
      next : (message) => alert(message)
    })
  }

  sendNotification ( notification : string): void{
    this.sendNotification$.next(notification)
  }

  
  loadAlumnos(): void{
    this.httpCliente.get<Alumnos[]>(environment.baseApiUrl + '/users',{
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

    return this.alumnos$;
  }

  createAlumno(alumno : CreateAlumnoData):void {

    const token = generateRandomString (20);

    this.httpCliente.post<Alumnos>(environment.baseApiUrl + '/users', {...alumno, token})
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

    this.httpCliente.put(environment.baseApiUrl + '/users/' + id, alumnoActualizado)
    .subscribe({
      next: ()=>this.loadAlumnos()
    })
  }

  getAlumnoByID ( id : number): Observable <Alumnos[]>{
    return this.http.get<Alumnos[]>(environment.baseApiUrl + `/users?userId= ${id}`)
  }

  deleteAlumnoById( id: number):void{
    
    this.httpCliente.delete(environment.baseApiUrl + '/users/' + id )
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
