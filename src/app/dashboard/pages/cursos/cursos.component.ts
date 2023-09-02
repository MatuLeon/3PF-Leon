import { Component, OnInit } from '@angular/core';
import { CursosData } from './model';
import { CursosService } from './cursos.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CursosFormDialogComponent } from './cursos-form-dialog/cursos-form-dialog/cursos-form-dialog.component';
import { Store } from '@ngrx/store';
import { CursosActions } from './store/cursos.actions';
import { selectCursosArray } from './store/cursos.selectors';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class CursosComponent implements OnInit{

  cursos$: Observable<CursosData[]>

  public displayedColumns = ['id', 'name', 'description', 'price', 'actions'];
  public isAdmin$ : Observable<boolean>;
  
  constructor
  (private cursoService: CursosService, 
  private matDialog: MatDialog,
  private store: Store
  ){
    this.cursos$ = this.store.select(selectCursosArray)
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }


  ngOnInit(): void {
    this.store.dispatch(CursosActions.loadCursoss())
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
        }
      }
    })
  }
}
