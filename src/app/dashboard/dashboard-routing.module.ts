import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfesoresModule } from "./pages/profesores/profesores.module";
import { HomeComponent } from "./pages/home/home.component";
import { adminGuard } from "../core/guards/admin.guard";


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'home',
            component: HomeComponent
        },
        {
            path: 'users',
            canActivate: [adminGuard],
            loadChildren: ()=> import ('./pages/users/users.module').then((m)=>m.UsersModule)
        },
        {
            path: 'cursos',
            loadChildren: ()=> import ('./pages/cursos/cursos.module').then((m)=>m.CursosModule)
        },
        {
            path: 'profesores',
            loadChildren: ()=>import('./pages/profesores/profesores.module').then((m)=>m.ProfesoresModule)
        },
        {
            path: 'counter',
            loadChildren: ()=>import('./pages/counter/counter.module').then((m)=>m.CounterModule)
        },
        {
            path: '**',
            redirectTo: 'home',
        }
    ])],
    exports: [RouterModule]
})

export class DashboardRoutingModule{}
