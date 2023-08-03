import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeModule } from './pages/home/home.module';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';





@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    ToolbarComponent
  ],
  imports: [
    HomeModule,
    UsersModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    SharedModule,
    RouterModule,
    MatListModule,
    DashboardRoutingModule,
  ],
  exports:[
    DashboardComponent,
  ]
})
export class DashboardModule { }
