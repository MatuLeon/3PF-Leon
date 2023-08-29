import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ErrorMessagesPipe } from './pipes/error-messages.pipe';
import { ResaltadoDirective } from './directives/resaltado.directive';
import { RepetirDirective } from './directives/repetir.directive';
import { ResaltarNotaDirective } from './directives/resaltar-nota.directive';
import { MatSelectModule } from '@angular/material/select'






@NgModule({
  declarations: [
    FullNamePipe,
    ErrorMessagesPipe,
    ResaltadoDirective,
    RepetirDirective,
    ResaltarNotaDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FullNamePipe,
    ErrorMessagesPipe,
    ResaltadoDirective,
    RepetirDirective,
    ResaltarNotaDirective,
    MatSelectModule
  ]
})
export class SharedModule { }
