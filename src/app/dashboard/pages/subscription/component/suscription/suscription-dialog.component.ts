import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SuscriptionActions } from '../../store/suscription.actions';
import { Alumnos } from '../../../users/model';
import { Observable } from 'rxjs';
import { selectAlumOption, selectCursoOption } from '../../store/suscription.selectors';
import { CursosData } from '../../../cursos/model';

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription-dialog.component.html',
  styles: [
  ]
})
export class SuscriptionDialogComponent implements OnInit {

  cursoIdControl = new FormControl(null, Validators.required)
  usersIdControl = new FormControl(null, Validators.required)


  suscriptionForm = new FormGroup({
    cursoId: this.cursoIdControl,
    usersId: this.usersIdControl
  });

  alumnoOption$:Observable<Alumnos[]>;
  cursoOption$: Observable<CursosData[]>

  constructor(private store: Store){
    this.alumnoOption$ = this.store.select(selectAlumOption)
    this.cursoOption$ = this.store.select(selectCursoOption)
  }

  ngOnInit(): void {
    this.store.dispatch(SuscriptionActions.loadCursoOptions());
    this.store.dispatch(SuscriptionActions.loadAlumnoOptions());

  }

}
