import { Component, OnInit } from '@angular/core';
import { CursosData } from './model';
import { CursosService } from './cursos.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosFormDialogComponent } from './cursos-form-dialog/cursos-form-dialog/cursos-form-dialog.component';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnInit{

  // public dataSource: CursosData[] = [];

  public data$: Observable<CursosData[]>;

  public displayedColumns = ['id', 'name', 'description', 'price', 'actions']

  constructor
  (private cursoService: CursosService, 
  private matDialog: MatDialog
  )
    
    {
    this.data$ = this.cursoService.getCursos()
  }

  ngOnInit(): void {
    this.cursoService.loadCursos();

    // this.cursoService.getCursos().subscribe({
    //   next: (data) => console.log('DATA: ' , data)
    // });


  }
  
  onCreate():void{
    this.matDialog.open(CursosFormDialogComponent)
  }

  onDelete(id: number):void{
    this.cursoService.deleteById(id)
  }

  agregarCurso():void{
    this.matDialog.open(CursosFormDialogComponent)
    .afterClosed()
    .subscribe({
      next: (v) =>{
        if(v){
          this.cursoService.createCurso({
            name: v.name,
            description: v.description,
            price: v.price,
          })
        }else console.log('Se cancelo')
      }
    })
  }
}
