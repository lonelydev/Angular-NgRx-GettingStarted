import { User } from '../user';
/* This is not necessary as user module isn't lazy loaded
 * I did this assuming user module is lazy loaded.
 * However, on inspecting the app.module.ts, I realised
 * that the app imports usermodule when building itself.
 */
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  users: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

/***
 * Let us strongly type everything
 *
 */
export function reducer(state: UserState, action) {
  switch (action.type) {
    case 'TOGGLE_MASK_USER_NAME':
      return {
        ...state,
        maskUserName: action.payload
      };
    default:
      return state;
  }
}
