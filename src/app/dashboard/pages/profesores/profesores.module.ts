import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresComponent } from './profesores.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfesoresFormDialogComponent } from './profesores-form-dialog/profesores-form-dialog.component';



@NgModule({
  declarations: [
    ProfesoresComponent,
    ProfesoresFormDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfesoresModule { }
