import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserData } from '../models/user-data/user-data';
import { UserActions, UserActionTypes } from '../actions/user/user.actions';

export interface UserState {
  users: UserData[];
  selectedUsers: UserData[];
}

const initialUserState: UserState = {
  users: [],
  selectedUsers: []
};

export interface AppState {
  user: UserState;
}

export function userReducer(state: UserState = initialUserState, action: UserActions): UserState {

  switch (action.type) {
    case UserActionTypes.LoadUsers:

      return {
        users: [],
        selectedUsers: []
      };

    case UserActionTypes.LoadUsersComplete :

        return {
          users: action.payload,
          selectedUsers: []
        };

    case UserActionTypes.UpdateUsersFilter :
        return {
          users: state.users,
          selectedUsers: state.users.filter((user) => {
            return action.payload.find(x => x === user.id);
            })
        };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};

export const users = (state: AppState) => state.user.users;

export const selectedUsers = (state: AppState) => state.user.selectedUsers;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
