import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { LoadUsers, UserActionTypes, UserError, LoadUsersComplete } from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState, users } from '../reducers';
import { UserService } from '../user/user.service';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {


// test test
  @Effect()
  loadUsers$ = this.actions$
  .pipe(
    ofType<LoadUsers>(UserActionTypes.LoadUsers),
    mergeMap((action) => this.userService.getUsers()
    .pipe(
      map(usersList => {
        return (new LoadUsersComplete(usersList));
      }),
      catchError((errorMessage) => of(new UserError({error: errorMessage})))
    )
    )
  );


  constructor(private actions$: Actions, private store: Store<AppState>, private userService: UserService) {}

}
