import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Alumnos } from '../../model';




@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = [ 'id','fullName','curso', 'email', 'password', 'actions' ];

  @Input()
  dataSource: Alumnos[] = [];

  @Output()
  deleteAlumno = new EventEmitter<Alumnos>();

  @Output()
  editAlumno = new EventEmitter<Alumnos>();


}
