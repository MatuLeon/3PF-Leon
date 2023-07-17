import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { UserFormDialogComponent } from './component/user-form-dialog/user-form-dialog.component';
import { Alumnos } from './model';

const ELEMENT_DATA: Alumnos[] = [{
  name : 'Carlita',
  lastname : 'Fernandez',
  email : 'carf@mail.com',
  password : '231231'
}
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  public alumnos : Alumnos[] = ELEMENT_DATA;


  constructor(
    private matDialog: MatDialog
    )
    {}

    agregarAlumno() : void{
    this.matDialog
    //Abro el modal.
    .open(UserFormDialogComponent)
    //Cierro el modal y
    .afterClosed()
    //Ejecuta esto
    .subscribe({
        next: (v)=>{
          if (v){
            this.alumnos = [
              ...this.alumnos, {
                name : v.name,
                lastname: v.lastname,
                email : v.email,
                password: v.password
              }
            ]
          }else console.log ('Cancelado')
        }
      })
    }
}
