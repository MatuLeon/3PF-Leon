import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosFormDialogComponent } from './cursos-form-dialog/cursos-form-dialog/cursos-form-dialog.component';



@NgModule({
  declarations: [
    CursosComponent,
    CursosFormDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
  ]
})
export class CursosModule { }
