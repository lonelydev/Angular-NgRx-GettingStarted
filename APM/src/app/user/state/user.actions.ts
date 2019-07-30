import { Action } from '@ngrx/store';

/** Enum to define the Action Type */
export enum UserActionTypes {
  MaskUserName = '[User] Mask Username'
}

/**
 * Action Creator class
 */
export class MaskUserName implements Action {
  public type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean){ }
}

/**
 * Union Type of Action Creators
 */
export type UserActions = MaskUserName;
