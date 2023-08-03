import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AlumnosDetailComponent } from './pages/users-detail/users-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        children:[
          {
              path :'',
              component: UsersComponent,
          },
          {
              path:':id',
              component: AlumnosDetailComponent
          }
      ]
      }
    ])
  ],
  exports:[RouterModule]
})
export class UsersRoutingModule { }
