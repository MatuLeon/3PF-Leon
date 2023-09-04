import { Component, Inject } from '@angular/core';
import { CursosData } from '../../model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cursos-form-dialog',
  templateUrl: './cursos-form-dialog.component.html',
  styleUrls: ['./cursos-form-dialog.component.scss']
})
export class CursosFormDialogComponent {

  editingCurso? : CursosData;


  idControl = new FormControl<number | null>(null);
  nameControl = new FormControl <string | null>(null, [Validators.required]);
  descriptionControl = new FormControl <string | null> (null, [Validators.required]);
  priceControl = new FormControl <number|null> (null,[Validators.required]);

  cursoForm = new FormGroup({
    id : this.idControl,
    name : this.nameControl,
    description : this.descriptionControl,
    price : this.priceControl,
  })

  constructor(
    private dialogRef: MatDialogRef<CursosFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: CursosData
  ){
    if(this.data){
      this.editingCurso = this.data;
      this.idControl.setValue(this.data.id);
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
      this.priceControl.setValue(this.data.price);
    }
  }

  onSubmitCurso(): void{
    if(this.cursoForm.invalid){
      this.cursoForm.markAllAsTouched()
    }else this.dialogRef.close(this.cursoForm.value)
  }
}
