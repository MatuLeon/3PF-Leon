import { Injectable } from "@angular/core";
import { LoginData } from "./model";
import { BehaviorSubject, Observable, map, take } from "rxjs"
import { Alumnos } from "../dashboard/pages/users/model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

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
        // return this.authAlumno$.pipe(
        //     take(1),
        //     map((alumno) => alumno ? true : false))

        return this.httpCliente.get<Alumnos[]>('http://localhost:3000/users', {
            params: {
                token: localStorage.getItem('token') || ''
            }
        }).pipe(
            map((alumResult) => {
                return !!alumResult.length
            })
        )
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
                    const authAlum = response[0]
                    this._authAlumno$.next(authAlum);
                    this.router.navigate(['/dashboard']);
                    localStorage.setItem('token', authAlum.token)
                }else{
                    this.notifier.showError('Email o contraseña invalidas');
                    this._authAlumno$.next(null)
                }
            },
            error: (err)=>{
                if (err instanceof HttpErrorResponse){
                    if (err.status === 500){
                        this.notifier.showError('')
                    }
                }
            }
        })
    }

}