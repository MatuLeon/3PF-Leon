import { Component, Inject, inject } from '@angular/core';
import { FormControl, 
  FormGroup, 
  Validators,
} from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumnos } from '../../model';


@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {

  idControl = new FormControl<number | null>(null,)

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    // this.noNumber()
  ]);
  lastNameControl = new FormControl<string | null>(null, [
    Validators.required
  ]);
  emailControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl<string | null>(null, [
    Validators.required
  ]);
  notaControl = new FormControl<string | null>(null, [
    Validators.required
  ]);

  userForm = new FormGroup({
    id : this.idControl,
    name : this.nameControl,
    lastname : this.lastNameControl,
    email : this.emailControl,
    password : this.passwordControl,
    nota : this.notaControl,
  })
  
  // noNumber(): ValidatorFn{
  //   return (control : AbstractControl): ValidationErrors | null =>{
  //     if (control instanceof FormControl){
  //       if (control.value?.includes(/^[0-9]$/)){
  //         return{
  //           noNumber: true
  //         }
  //       }
  //     }

  //     return null
  //   }
  // }

    constructor(
      private dialogRef: MatDialogRef <UserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data?: Alumnos
      ){
        if (this.data){
          this.idControl.setValue(this.data.id)
          this.nameControl.setValue(this.data.name);
          this.lastNameControl.setValue(this.data.lastname);
          this.emailControl.setValue(this.data.email);
          this.notaControl.setValue(this.data.nota);
          this.passwordControl.setValue(this.data.password)

        }
      }

  onSubmit(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
    }else this.dialogRef.close(this.userForm.value)
  }
}
