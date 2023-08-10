import { TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AuthService } from "../../auth.service"

describe('LoginComponent', ()=> {

    let component : LoginComponent

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
        })
        component = TestBed.createComponent(LoginComponent).componentInstance

        
    })

    it('El formulario debe ser invalido, los campos deben quedar en blanco', ()=>{
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue()
    })

    it ('Al llamar login() y el formulario es invalido, se debe llamar al metodo markAllAsTouched de la propiedad loginForm', ()=>{
        //1- Asegurarme de que el form sea valido
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue()

        //2. Llamar al login
        const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');

        component.login()

        //3- Evaluar si se llamo markAllAsTouched() de loginForm
        expect(spyOfMarkAllAsTouched).toHaveBeenCalled()
    })
    
    it ('Al llamar login() y el formulario es VALIDO, debe haberse llamado el método login() del authService',()=>{
        const authService = TestBed.inject(AuthService);

        component.emailControl.setValue('fake@email.com');
        component.passwordControl.setValue('123');

        expect(component.loginForm.valid).toBeTrue();

        const spyOnAuthService = spyOn(authService, 'login');
        component.login();

        expect(spyOnAuthService).toHaveBeenCalled()
    })
})