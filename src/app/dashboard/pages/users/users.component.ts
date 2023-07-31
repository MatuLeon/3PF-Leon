import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { UserFormDialogComponent } from './component/user-form-dialog/user-form-dialog.component';
import { Alumnos } from './model';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent {

  public alumnos : Observable<Alumnos[]>;

  constructor(
    private matDialog: MatDialog,
    private alumnosService : UserService, 
    private notifier : NotifierService
    )

    {
      this.alumnos = this.alumnosService.getAlumnos();

      this.alumnosService.loadAlumnos();
    }



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
            this.notifier.showSucces('Registro exitoso')
            this.alumnosService.createAlumno({
              name : v.name,
              lastname : v.lastname,
              email: v.email,
              password: v.password,
              curso : v.nota,
            });
        }
      }})
    }


    onDeleteAlumno(alumnoToDelete : Alumnos) : void{
      if (confirm(`¿Esta seguro que quiere eliminar a ${alumnoToDelete.name}?`)) {
        this.alumnosService.deleteAlumnoById(alumnoToDelete.id)
      }
    } 

    onEditAlumno(editAlumno : Alumnos):void{
      this.matDialog
      //Abro el modal.
      .open(UserFormDialogComponent, {
        data : editAlumno
      })
      //Cierro el modal y
      .afterClosed()
      //Ejecuta esto
      .subscribe({
          next: (alumnoUpdated)=>{
            if(alumnoUpdated){
              this.alumnosService.updateAlumnoByID(editAlumno.id, alumnoUpdated )
            }
          }
        })
      
    }


}
