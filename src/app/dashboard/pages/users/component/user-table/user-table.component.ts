import { Component, Input } from '@angular/core';
import { Alumnos } from '../../model';




@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  displayedColumns: string[] = ['fullName','nota', 'email', 'password', ];

  @Input()
  dataSource: Alumnos[] = [];
}
