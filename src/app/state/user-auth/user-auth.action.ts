import { createAction, props } from "@ngrx/store";
import { UserData } from "src/interfaces/user-data";

const COMPONENT_NAME = 'User Auth';


export const login = createAction(
  `${COMPONENT_NAME} Try Login`,
  props<{ username: string; password: string }>()
)

export const loginSuccess = createAction(
  `${COMPONENT_NAME} Login success`,
  props<{ userData: UserData }>()
);

export const loginFailure = createAction(
  `${COMPONENT_NAME} Login failure`,
  props<{ error: string }>()
);

export const signOut = createAction(
  `${COMPONENT_NAME} Sign Out`
);