import { Component, Inject } from '@angular/core';
import { DataProfesor } from '../modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profesores-form-dialog',
  templateUrl: './profesores-form-dialog.component.html',
})
export class ProfesoresFormDialogComponent {

  editingProfe?: DataProfesor;

  idControl = new FormControl <number | null> (null);
  nameControl = new FormControl <string | null>(null, [Validators.required]);
  tituloControl = new FormControl <string |null> (null, [Validators.required]);
  materiaControl = new FormControl <string| null> (null ,[Validators.required])

  profeForm = new FormGroup({
    id: this.idControl,
    name : this.nameControl,
    titulo: this.tituloControl,
    materia: this.materiaControl,
  })

  constructor
  (
    private dialogRef : MatDialogRef<ProfesoresFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data? : DataProfesor
  )
    {
      if(this.data){
        this.editingProfe = this.data;
        this.idControl.setValue(this.data.id);
        this.nameControl.setValue(this.data.name);
        this.tituloControl.setValue(this.data.titulo);
        this.materiaControl.setValue(this.data.materia)
      }
    }

    onSubmitProfe():void{
      if(this.profeForm.invalid){
        this.profeForm.markAllAsTouched()
      }else this.dialogRef.close(this.profeForm.value)
    }

}
