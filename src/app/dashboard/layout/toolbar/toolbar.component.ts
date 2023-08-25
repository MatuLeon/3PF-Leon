import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Alumnos } from '../../pages/users/model';
import { Store } from '@ngrx/store';
import { selectAuthAlum } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input()
  public drawer? : MatDrawer

  public authAlum$: Observable<Alumnos| null>
  constructor(private authService : AuthService, private store: Store){
    this.authAlum$ = this.store.select(selectAuthAlum)
  }
}
