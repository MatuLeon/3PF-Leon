import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";
import { state } from "@angular/animations";

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthAlum = createSelector(selectAuthState, (state)=>state.authAlumno);
export const selectAuthAlumRole = createSelector(selectAuthState, (state)=> state.authAlumno?.role);
export const selectIsAdmin = createSelector(selectAuthState, (state) => state.authAlumno?.role === 'ADMINISTRADOR')