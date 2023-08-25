import { createReducer, on } from "@ngrx/store";
import { Alumnos } from "src/app/dashboard/pages/users/model";
import { AuthActions } from "./auth.actions";

export const authFeatureKey = 'auth';
export interface AuthState {
    authAlumno: Alumnos | null;
}

const initialState: AuthState = {
    authAlumno: null,
}

export const authReducer = createReducer(initialState, 
    on(
        AuthActions.setAuthAlumno,
        (currentState, action)=>{
            return{
                authAlumno: action.data
            }
        }
        ))

