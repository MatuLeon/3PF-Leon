import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosComponent } from './cursos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosFormDialogComponent } from './cursos-form-dialog/cursos-form-dialog/cursos-form-dialog.component';
import { CursosTableComponent } from './cursos-table/cursos-table/cursos-table.component';



@NgModule({
  declarations: [
    CursosComponent,
    CursosFormDialogComponent,
    CursosTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class CursosModule { }
