import { NgModule } from "@angular/core"
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CursosComponent } from "./pages/cursos/cursos.component";
import { ProfesoresComponent } from "./pages/profesores/profesores.component";
import { UsersComponent } from "./pages/users/users.component";
import { AlumnosDetailComponent } from "./pages/users/pages/users-detail/users-detail.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path:'home',
                component: HomeComponent,
            },
            {
                path: 'users',
                children:[
                    {
                        path: '',
                        component: UsersComponent,
                    },
                    {
                        path:':id',
                        component:AlumnosDetailComponent,
                    },
                ],
            },
            {
                path: 'cursos',
                component: CursosComponent,
            },
            {
                path: 'profesores',
                component: ProfesoresComponent,
            },
            {
                path: '**',
                redirectTo: 'home'
            },
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule{}