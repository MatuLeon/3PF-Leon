import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Alumnos } from '../../model';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styles: [
  ]
})
export class AlumnosDetailComponent implements OnInit {

    public displayedColumns = ['id', 'name', 'curso']
    alumno: Alumnos[] = []

  constructor (private activatedRoute : ActivatedRoute, 
    private userService : UserService
  ) {}

  ngOnInit():void{
    this.userService.getAlumnoByID(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: (alumno)=> console.log(this.alumno = alumno)
    })
  }
}
