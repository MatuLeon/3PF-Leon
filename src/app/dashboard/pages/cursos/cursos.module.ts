import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CursosFormDialogComponent } from './cursos-form-dialog/cursos-form-dialog/cursos-form-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './store/cursos.effects';
import { StoreModule } from '@ngrx/store';
import { cursosFeature } from './store/cursos.reducer';



@NgModule({
  declarations: [
    CursosComponent,
    CursosFormDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CursosRoutingModule,
    StoreModule.forFeature(cursosFeature),
    EffectsModule.forFeature([CursosEffects]),
  ]
})
export class CursosModule { }
