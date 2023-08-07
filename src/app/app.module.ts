import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CursosModule } from './dashboard/pages/cursos/cursos.module';
import { ProfesoresModule } from './dashboard/pages/profesores/profesores.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CursosModule,
    ProfesoresModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
