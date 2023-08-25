import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { Router, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: CounterComponent
      }
    ])
  ]
})
export class CounterModule { }
