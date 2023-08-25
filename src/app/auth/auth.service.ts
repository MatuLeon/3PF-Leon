import { Injectable } from "@angular/core";
import { LoginData } from "./model";
import { BehaviorSubject, Observable, map, take } from "rxjs"
import { Alumnos } from "../dashboard/pages/users/model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";

@Injectable({providedIn: 'root'})

export class AuthService{

    constructor(
        private notifier : NotifierService, 
        private router: Router, 
        private httpCliente : HttpClient,
        private store : Store
        ){}


    isAuthenticated(): Observable<boolean>{

        return this.httpCliente.get<Alumnos[]>('http://localhost:3000/users', {
            params: {
                token: localStorage.getItem('token') || ''
            }
        }).pipe(
            map((alumResult) => {

                if(alumResult.length){
                    const authAlumn = alumResult[0];
                    this.store.dispatch(AuthActions.setAuthAlumno({data : authAlumn}))
                }
                return !!alumResult.length
            })
        )
    }



    login(loginData: LoginData) : void {

        this.httpCliente.get<Alumnos[]>('http://localhost:3000/users', {
            params: {
                email: loginData.email || '',
                password: loginData.password || ''
            }
        }).subscribe({
            next: (response)=>{
                if(response.length){
                    const authAlum = response[0]
                    this.store.dispatch(AuthActions.setAuthAlumno({data : authAlum}))
                    this.router.navigate(['/dashboard']);
                    localStorage.setItem('token', authAlum.token)
                }else{
                    this.notifier.showError('Email o contraseña invalidas');
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

    public logout():void{
        this.store.dispatch(AuthActions.setAuthAlumno({data : null}))

    }

}