import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Alumnos } from '../../model';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styles: [
  ]
})
export class AlumnosDetailComponent {
  public dataSource = []
  public displayedColumns = ['id']
  public alumnos: Alumnos | null = null;
  public alumnoID? : number;
  constructor (private activatedRoute : ActivatedRoute, 
    private router: Router, 
    private notification: NotifierService,
    private alumnoService : UserService
    )
    {
      if (!Number(this.activatedRoute.snapshot.params['id'])){
        this.router.navigate(['dashboard', 'users']);
        this.notification.showError(`${this.activatedRoute.snapshot.params['id']} no es un ID valido`)
      }else{
        this.alumnoID = Number(this.activatedRoute.snapshot.params['id'])
        this.loadAlumnoId()
      }
  }

  loadAlumnoId() :void {
    if (this.alumnoID){
      this.alumnoService.getAlumnoByID(this.alumnoID).subscribe({
        next: (alumno) => console.log(alumno)
      })
    }
  }
}
