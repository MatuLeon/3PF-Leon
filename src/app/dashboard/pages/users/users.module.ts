import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './component/user-form-dialog/user-form-dialog.component';
import { UserTableComponent } from './component/user-table/user-table.component';
import { AlumnosDetailComponent } from './pages/users-detail/users-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersComponent,
    UserFormDialogComponent,
    UserTableComponent,
    AlumnosDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    UsersComponent
  ]
})
export class UsersModule { }
