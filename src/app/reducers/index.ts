import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { UserData } from '../models/user-data/user-data';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActions, UserActionTypes } from '../actions/user/user.actions';

export interface UserState extends EntityState<UserData[]> {
  users: UserData[];
}

export const adapter: EntityAdapter<UserData[]> = createEntityAdapter<UserData[]>();

export const initialUserState: UserState = adapter.getInitialState({
  users: []
});

export interface AppState {
  user: UserState;
}

export function userReducer(state: UserState = initialUserState, action: UserActions): UserState {

  switch (action.type) {
    case UserActionTypes.LoadUsers:

      return {... state};

    case UserActionTypes.LoadUsersComplete :

        return {
          ...state,
          users: action.payload
        };

    case UserActionTypes.ToggleUserVisibility :

      return state.users && state.users.length > 0
      ? {
          ...state,
          users: state.users.map((user) => user.id === action.payload
              ? {
                    ...user,
                    selected: !user.selected
                }
              : user)
        }
      : state;

    case UserActionTypes.CreateEventForUser :

      return state.users && state.users.length > 0
      ? {
          ...state,
          users: state.users.map((user) => user.id.toString() === action.payload.extendedProps.userId.toString()
              ? {
                    ...user,
                    events : user.events.concat(action.payload)
                }
              : user)
        }
      : state;

    case UserActionTypes.UpdateEventForUser :
        return state.users && state.users.length > 0
        ? {
            ...state,
            users: state.users.map((user) => user.id === action.payload.extendedProps.userId
                ? {
                      ...user,
                      events : user.events.map((eventItem) => eventItem.id === action.payload.id
                      ? action.payload
                      : eventItem),
                  }
                : user)
          }
        : state;

    case UserActionTypes.RemoveEventForUser :
        return state.users && state.users.length > 0
        ? {
            ...state,
            users: state.users.map((user) => user.id === action.payload.extendedProps.userId
                ? {
                      ...user,
                      events : user.events.filter(x => x.id !== action.payload.id)
                  }
                : user)
          }
        : state;

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};

export const users = (state: AppState) => state.user.users;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
