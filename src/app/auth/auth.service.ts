import { Injectable } from "@angular/core";
import { LoginData } from "./model";
import { BehaviorSubject, Observable, map, take } from "rxjs"
import { Alumnos } from "../dashboard/pages/users/model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class AuthService{

    private _authAlumno$ = new BehaviorSubject<Alumnos | null>(null)
    public authAlumno$ = this._authAlumno$.asObservable()

    constructor(
        private notifier : NotifierService, 
        private router: Router, 
        private httpCliente : HttpClient,
        ){}


    isAuthenticated(): Observable<boolean>{
        return this.authAlumno$.pipe(
            take(1),
            map((alumno) => alumno ? true : false))
    }



    login(loginData: LoginData) : void {
        // const MOCK_ALUM : Alumnos = {
        //     id: 20,
        //     name: 'Mockname',
        //     lastname: 'MockLast',
        //     email : 'mock@email.com',
        //     curso: 'none',
        //     password: '123'
        // }

        // if ( loginData.email === MOCK_ALUM.email && loginData.password === MOCK_ALUM.password){
        //     this._authAlumno$.next(MOCK_ALUM)
        //     this.router.navigate(['/dashboard'])
        // }else {
        //     this.notifier.showError('Email o contraseña invalidos')
        //     this._authAlumno$.next(null)
        // }

        this.httpCliente.get<Alumnos[]>('http://localhost:3000/users', {
            params: {
                email: loginData.email || '',
                password: loginData.password || ''
            }
        }).subscribe({
            next: (response)=>{
                if(response.length){
                    this._authAlumno$.next(response[0]);
                    this.router.navigate(['/dashboard'])
                }else{
                    this.notifier.showError('Email o contraseña invalidas');
                    this._authAlumno$.next(null)
                }
            }
        })
    }

}