import { Action } from '@ngrx/store';
import { UserData } from '../models/user-data/user-data';

export enum UserActionTypes {
  LoadUsers = '[User] Load users',
  LoadUsersComplete = '[User] Load users complete',
  UpdateUserFilter = '[User] update user filter',
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

// export class UpdateUserFilter implements Action {
//   readonly type = UserActionTypes.UpdateUserFilter;

//   constructor(public payload: UserData[]) {}
// }

// export class CreateEventForUser implements Action {
//   readonly type = UserActionTypes.LoadUsers;

//   constructor(readonly payload: {UserData: UserData, EventData: EventData}) {}
// }

// export class UpdateEventForUser implements Action {
//   readonly type = UserActionTypes.LoadUsers;

//   constructor(readonly payload: {UserData: UserData, EventData: EventData}) {}
// }

// export class RemoveEventForUser implements Action {
//   readonly type = UserActionTypes.LoadUsers;

//   constructor(readonly payload: {UserData: UserData, EventData: EventData}) {}
// }

export class UserError implements Action {
  readonly type = UserActionTypes.UserError;

  constructor(readonly payload: {error: string}) {

  }
}


export type UserActions = LoadUsers
                          | LoadUsersComplete
                          // | CreateEventForUser
                          // | UpdateEventForUser
                          // | RemoveEventForUser
                          | UserError
                          ;

