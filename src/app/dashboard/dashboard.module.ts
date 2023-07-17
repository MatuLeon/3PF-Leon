import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './pages/users/users.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    HomeModule,
    UsersModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule,
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
