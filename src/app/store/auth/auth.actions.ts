import { createActionGroup, props } from "@ngrx/store";
import { Alumnos } from "src/app/dashboard/pages/users/model";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'set auth alumno': props<{data : Alumnos | null} >()
    }
})