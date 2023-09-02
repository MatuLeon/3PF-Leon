import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { SuscriptionEffects } from './store/suscription.effects';
import { StoreModule } from '@ngrx/store';
import { suscriptionFeature } from './store/suscription.reducer';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SuscriptionDialogComponent } from './component/suscription/suscription-dialog.component';



@NgModule({
  declarations: [
    SubscriptionComponent,
    SuscriptionDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SubscriptionRoutingModule,
    StoreModule.forFeature(suscriptionFeature),
    EffectsModule.forFeature([SuscriptionEffects]),
  ]
})
export class SubscriptionModule { }
