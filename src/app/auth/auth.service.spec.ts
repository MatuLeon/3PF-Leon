import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed, flush } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.service"
import { Alumnos } from "../dashboard/pages/users/model"
import { Router } from "@angular/router"
import { RouterMock } from "../core/mocks/router.mock"
import { MockProvider }from 'ng-mocks'

describe ('AuthService', ()=>{

    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                MockProvider(Router)
            ]
        })
        service = TestBed.inject(AuthService);
        httpController= TestBed.inject(HttpTestingController)
    });


    it('Si el login es valido el observable authAlumno$ debe emitir un valor', ()=>{
        
        const mockUser : Alumnos ={
            id: 1,
            email: "fake@email.com",
            password: '123',
            curso: 'Algo hace',
            name: 'Fake',
            lastname: 'Fakex2',
            token: 'asdasdasd132'
        }

        const mockResponse: Alumnos[] = [ mockUser]
        
        service.login({
            email: mockUser.email,
            password: mockUser.password
        });


        httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/users?email=${mockUser.email}&password=${mockUser.password}`
        }).flush(mockResponse)

    })
})