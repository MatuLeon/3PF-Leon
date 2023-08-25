import { ActionReducerMap } from "@ngrx/store";
import { authFeatureKey, authReducer, AuthState } from "./auth/auth.reducer";


export interface AppStore {
    [authFeatureKey]: AuthState,
}

export const appReducer: ActionReducerMap <AppStore> =  {
    [authFeatureKey]: authReducer,
}