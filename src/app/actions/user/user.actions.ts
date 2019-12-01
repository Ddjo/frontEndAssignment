import { Action } from '@ngrx/store';
import { UserData } from '../../models/user-data/user-data';
import { EventData } from 'src/app/models/event-data/event-data';

export enum UserActionTypes {
  LoadUsers = '[User] Load users',
  LoadUsersComplete = '[User] Load users complete',
  ToggleUserVisibility = '[User] update user visibility',
  CreateEventForUser = '[User] Create event for user',
  UpdateEventForUser = '[User] Update event for user',
  RemoveEventForUser = '[User] remove event for user',
  UserError = '[User] User error'
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;

  constructor() {}
}

export class LoadUsersComplete implements Action {
  readonly type = UserActionTypes.LoadUsersComplete;

  constructor(public payload: UserData[]) {}
}

export class ToggleUserVisibility implements Action {
  readonly type = UserActionTypes.ToggleUserVisibility;

  constructor(public payload: number) {}
}

export class CreateEventForUser implements Action {
  readonly type = UserActionTypes.CreateEventForUser;

  constructor(public payload: EventData) {}
}

// export class UpdateEventForUser implements Action {
//   readonly type = UserActionTypes.LoadUsers;

//   constructor(readonly payload: {EventData: EventData}) {}
// }

// export class RemoveEventForUser implements Action {
//   readonly type = UserActionTypes.LoadUsers;

//   constructor(readonly payload: {EventData: EventData}) {}
// }

export class UserError implements Action {
  readonly type = UserActionTypes.UserError;

  constructor(readonly payload: {error: string}) {

  }
}


export type UserActions = LoadUsers
                          | LoadUsersComplete
                          | ToggleUserVisibility
                          | CreateEventForUser
                          | UserError
                          ;

