import { Pipe, PipeTransform } from '@angular/core';
import { Alumnos } from 'src/app/dashboard/pages/users/model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(alumnos: Alumnos, ...args: unknown[]): unknown {
    return `${alumnos.name} ${alumnos.lastname}`;
  }

}
