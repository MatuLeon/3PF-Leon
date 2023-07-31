import { Component, OnInit } from '@angular/core';
import { Cursos } from '../../model';
import { Observable } from 'rxjs';
import { CursosService } from '../../cursos.service';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.scss']
})
export class CursosTableComponent {


  public dataSource: Cursos[] = [];
  public displayedColumns = ['id', 'name' , 'description', 'price', 'actions'];
  public data$ : Observable<Cursos[]>;

  constructor(private cursoService : CursosService){
    this.data$ = this.cursoService.getCursos()
  } 
  
  ngOnInit(): void{
    this.cursoService.loadCursos()

    this.cursoService.getCursos().subscribe({
      next: (data)=> console.log(data)
    })
  }

  // onCreate(): void{
  //   this.cursoService.createCurso()
  // }

  onDelete(id: number):void{
    this.cursoService.deleteById(id)
  }
}
