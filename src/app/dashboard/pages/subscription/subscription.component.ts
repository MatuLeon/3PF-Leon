import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SuscriptionActions } from './store/suscription.actions';
import { Observable } from 'rxjs';
import { SuscriptionWithCursoAndAlum } from './model';
import { SelectCurso } from './store/suscription.selectors';
import { MatDialog } from '@angular/material/dialog';
import { SuscriptionDialogComponent } from './component/suscription/suscription-dialog.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit{
  displayedColumns = ['id', 'curso', 'alumno', 'total'];
  suscription$: Observable<SuscriptionWithCursoAndAlum[]>;

  constructor(private store: Store, private matDialog: MatDialog){
    this.suscription$ = this.store.select(SelectCurso)
  }

  onAdd():void{
    this.matDialog.open(SuscriptionDialogComponent)
  }

  ngOnInit(): void {
    this.store.dispatch(SuscriptionActions.loadSuscriptions())
  }
  onDelete(){}


}

