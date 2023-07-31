import { Component} from '@angular/core';
import { Observable} from 'rxjs';
import { Cursos } from './model';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from './cursos.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { UserFormDialogComponent } from '../users/component/user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent{
  // public dataSource: Cursos[] = [];
  // public displayedColumns = ['id', 'name' , 'description', 'price', 'actions'];
  // public data$ : Observable<Cursos[]>;

  // constructor(private cursoService : CursosService){
  //   this.data$ = this.cursoService.getCursos()
  // }
  
  // ngOnInit(): void{
  //   this.cursoService.loadCursos()

  //   this.cursoService.getCursos().subscribe({
  //     next: (data)=> console.log(data)
  //   })
  // }

  // onCreate(): void{
  //   this.cursoService.createCurso()
  // }

  // onDelete(id: number):void{
  //   this.cursoService.deleteById(id)
  // }

  public curso: Observable<Cursos[]>;

  constructor(
    private matDialog: MatDialog,
    private cursoService : CursosService,
    private notifier: NotifierService,
  )

  {
    this.curso = this.cursoService.getCursos()

    this.cursoService.loadCursos()
  }

  agregarCurso():void{
    this.matDialog
    .open(UserFormDialogComponent)
    .afterClosed()
    .subscribe({
      next:(c)=>{
        if(c){
          this.notifier.showSucces('RegistroExitoso')
          this.cursoService.createCurso({
            name : c.name,
            description: c.description,
            price: c.price
          })
        }
      }
    })
  }
}
