import { Action } from '@ngrx/store';
import { UserData } from '../../models/user-data/user-data';

export enum UserActionTypes {
  LoadUsers = '[User] Load users',
  LoadUsersComplete = '[User] Load users complete',
  UpdateUsersFilter = '[User] update user filter',
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

export class UpdateUsersFilter implements Action {
  readonly type = UserActionTypes.UpdateUsersFilter;

  constructor(public payload: number[]) {}
}

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
                          | UpdateUsersFilter
                          | UserError
                          ;

