import { User } from "../user.model";
import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions | Action
): State {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const loginAction = action as AuthActions.AuthenticateSuccess;
      const user = new User(
        loginAction.payload.email,
        loginAction.payload.userId,
        loginAction.payload.token,
        loginAction.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      const loginFailAction = action as AuthActions.AuthenticateFail;
      return {
        ...state,
        user: null,
        authError: loginFailAction.payload,
        loading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      }
    default:
      return state;
  }
}


