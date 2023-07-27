import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styles: [
  ]
})
export class AlumnosDetailComponent {
  constructor (private activatedRoute : ActivatedRoute){
    this.activatedRoute.snapshot.params['id']
  }

  loadAlumnoId() :void {
    // UserService.getAlumnoById(this.activatedRoute.snapshot.paramMap.get('id')).
  }
}
