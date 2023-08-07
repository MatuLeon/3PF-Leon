import { Injectable } from "@angular/core";
import { LoginData } from "./model";
import { BehaviorSubject } from "rxjs"
import { Alumnos } from "../dashboard/pages/users/model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})

export class AuthService{

    private _authAlumno$ = new BehaviorSubject<Alumnos | null>(null)
    public authAlumno$ = this._authAlumno$.asObservable()

    constructor(private notifier : NotifierService, private router: Router){}

    login(loginData: LoginData) : void {
        const MOCK_ALUM : Alumnos = {
            id: 20,
            name: 'Mockname',
            lastname: 'MockLast',
            email : 'mock@email.com',
            curso: 'none',
            password: '123'
        }

        if ( loginData.email === MOCK_ALUM.email && loginData.password === MOCK_ALUM.password){
            this._authAlumno$.next(MOCK_ALUM)
            this.router.navigate(['/dashboard'])
        }else {
            this.notifier.showError('Email o contraseña invalidos')
            this._authAlumno$.next(null)
        }
    }

}