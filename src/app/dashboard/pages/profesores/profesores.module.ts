import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresComponent } from './profesores.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfesoresFormDialogComponent } from './profesores-form-dialog/profesores-form-dialog.component';
import { ProfesorRoutingModule } from './profesores-routing.module';



@NgModule({
  declarations: [
    ProfesoresComponent,
    ProfesoresFormDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfesorRoutingModule
  ]
})
export class ProfesoresModule { }
