import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { LoadUsers, UserActionTypes, UserError, LoadUsersComplete } from '../../actions/user/user.actions';
import { UserService } from '../../user/user.service';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {


  @Effect()
  loadUsers$ = this.actions$
  .pipe(
    ofType<LoadUsers>(UserActionTypes.LoadUsers),
    mergeMap(() => this.userService.getUsers()
    .pipe(
      map(usersList => {
        return (new LoadUsersComplete(usersList));
      }),
      catchError((errorMessage) => of(new UserError({error: errorMessage})))
    )
    )
  );


  constructor(private actions$: Actions, private userService: UserService) {}

}
