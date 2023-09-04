import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SuscriptionActions } from '../../store/suscription.actions';
import { Alumnos } from '../../../users/model';
import { Observable } from 'rxjs';
import { selectAlumOption, selectCursoOption } from '../../store/suscription.selectors';
import { CursosData } from '../../../cursos/model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-suscription',
  templateUrl: './suscription-dialog.component.html',
  styles: [
  ]
})
export class SuscriptionDialogComponent implements OnInit {

  cursoIdControl = new FormControl(null, Validators.required)
  alumnoIdControl = new FormControl(null, Validators.required)


  suscriptionForm = new FormGroup({
    cursoId: this.cursoIdControl,
    alumnoId: this.alumnoIdControl
  });

  alumnoOption$:Observable<Alumnos[]>;
  cursoOption$: Observable<CursosData[]>

  constructor(private store: Store, private matDialogRef: MatDialogRef<SuscriptionDialogComponent>){
    this.alumnoOption$ = this.store.select(selectAlumOption)
    this.cursoOption$ = this.store.select(selectCursoOption)
  }

  ngOnInit(): void {
    this.store.dispatch(SuscriptionActions.loadCursoOptions());
    this.store.dispatch(SuscriptionActions.loadAlumnoOptions());
  }

  onSubmit(): void{
    if (this.suscriptionForm.invalid){
      this.suscriptionForm.markAllAsTouched()
    }else{
      this.store.dispatch(SuscriptionActions.createSuscripcion({payload: this.suscriptionForm.getRawValue()}))
      this.matDialogRef.close()
    }
  }

}
