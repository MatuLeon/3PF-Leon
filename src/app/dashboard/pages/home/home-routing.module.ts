import { NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component:HomeComponent,
            }
        ])
    ],
    exports: [RouterModule]
})


export class HomeRoutingModule{}