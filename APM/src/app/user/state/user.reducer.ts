import { User } from '../user';
/* This is not necessary as user module isn't lazy loaded
 * I did this assuming user module is lazy loaded.
 * However, on inspecting the app.module.ts, I realised
 * that the app imports usermodule when building itself.
 */
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  toggleUserMask: boolean;
  currentUser: User;
}

/***
 * Let us strongly type everything
 *
 */
export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MASK_USER_NAME':
      return {
        ...state,
        toggleUserMark: action.payload
      };
    default:
      return state;
  }
}
