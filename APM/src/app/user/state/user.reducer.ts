import { User } from '../user';
/* This is not necessary as user module isn't lazy loaded
 * I did this assuming user module is lazy loaded.
 * However, on inspecting the app.module.ts, I realised
 * that the app imports usermodule when building itself.
 */
import * as fromRoot from '../../state/app.state';
import { UserActionTypes, UserActions } from './user.actions';

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

/***
 * Let us strongly type everything
 *
 */
export function reducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
