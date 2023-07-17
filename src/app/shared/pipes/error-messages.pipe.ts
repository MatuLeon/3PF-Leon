import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessages'
})
export class ErrorMessagesPipe implements PipeTransform {

  transform(error: { key :string, value :any}, ...args: unknown[]): unknown {

    const errorMessages: Record<string, string> = {
      required : 'Este campo es obligatorio',
      email : 'Email no valido'
    }

    console.log(error)
    return errorMessages[error.key] || 'Campo invalido';
  }

}
