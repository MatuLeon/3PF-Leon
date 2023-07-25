import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { UserFormDialogComponent } from './component/user-form-dialog/user-form-dialog.component';
import { Alumnos } from './model';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, delay, filter, map, of, tap, } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent {

  public alumnos : Observable<Alumnos[]>;
  public loading = false;
  public nombres: string[] = [];
  public numeros: number[] = [];



  constructor(
    private matDialog: MatDialog,
    private alumnosService : UserService, 
    private notifier : NotifierService
    )

    {
      this.alumnos = this.alumnosService.getAlumnos().pipe(
        map((valor)=> valor.map((alumno)=> ({
          ...alumno, 
          name : alumno.name.toUpperCase(),
          lastname : alumno.lastname.toUpperCase(),
          
        })))
      );

      of (1 , 2, 3, 4, 5)
      .pipe(
        map((v)=> v *3 ),
        filter ((valorMultiplicado) => valorMultiplicado < 5)
      ).subscribe({
        next:(v)=>{
          console.log(v)
        }
      })

      let loading = false
      const obj1$ = of (['Mondongo', ' Leon' , ' Coco' , ' Michina']).pipe(delay(1000))
      const obj2$ = of ([1, 2, 3, 4, 5, 6]).pipe(delay(2000));

      this.loading = true;

      obj1$.subscribe({
        next: (v) => (this.nombres = v),
        complete : () =>(this.loading = false)
      });

      obj2$.subscribe({
        next: (v) => (this.numeros = v),
        complete : ()=> (this.loading = false)
      })

      this.alumnosService.loadAlumnos();
      // this.alumnosService.getAlumnos().subscribe({
      //   next :(alumnos) =>{
      //     this.alumnos = alumnos
      //     this.alumnosService.sendNotification ('Se cargaron los alumnos');
      //   }
      // })
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
            // this.alumnosService.createAlumno({
            //   id: this.alumnos.length + 1,
            //   name : v.name,
            //   lastname : v.lastname,
            //   email: v.email,
            //   password: v.password,
            //   nota : v.nota,
            // });
            console.log ('Recibimos el valor: ', v)
          } else {
            console.log ('Se cancelo')
          }
        }
      })
    }


    onDeleteAlumno(alumno : Alumnos) : void{
      console.log(alumno);
      if (confirm(`¿Esta seguro que quiere eliminar a ${alumno.name}?`)) {
        // this.alumnos = this.alumnos.filter((A)=> A.name != alumno.name)
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
          next: (data)=>{
            console.log(data)
            if(data){
              // this.alumnos = this.alumnos.map((alumno)=>{
              //   return alumno
              // })
            }
          }
        })
      
    }


}
