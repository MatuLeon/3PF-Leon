import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfesoresModule } from "./pages/profesores/profesores.module";


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'home',
            loadChildren: ()=> import('./pages/home/home.module').then((m)=>m.HomeModule),
        },
        {
            path: 'users',
            loadChildren: ()=> import ('./pages/users/users.module').then((m)=>m.UsersModule)
        },
        {
            path: 'cursos',
            loadChildren: ()=> import ('./pages/cursos/cursos.module').then((m)=>m.CursosModule)
        },
        {
            path: 'profesores',
            loadChildren: ()=>import('./pages/profesores/profesores.module').then((m)=>ProfesoresModule)
        }
    ])],
    exports: [RouterModule]
})

export class DashboardRoutingModule{}
