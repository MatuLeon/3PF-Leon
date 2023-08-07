import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfesoresModule } from "./pages/profesores/profesores.module";
import { HomeComponent } from "./pages/home/home.component";


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'home',
            component: HomeComponent
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
        },
        {
            path: '**',
            redirectTo: 'home',
        }
    ])],
    exports: [RouterModule]
})

export class DashboardRoutingModule{}
