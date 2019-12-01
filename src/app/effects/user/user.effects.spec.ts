import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { UserEffects } from './user.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/reducers';
import { UserService } from 'src/app/user/user.service';
import { ReplaySubject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {  UserActionTypes } from 'src/app/actions/user/user.actions';

describe('UserEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: UserEffects;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        UserService,
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot(reducers),
      ],
    });

    effects = TestBed.get<UserEffects>(UserEffects);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  describe('loadUsers', () => {
    it('Should load the list of users', () => {
      actions$ = new ReplaySubject(1);

      const userList: any = require('../../../content/users.json');

      const routerNavigatedAction = {
        type: UserActionTypes.LoadUsers
      };

      actions$.next(routerNavigatedAction);
      effects.loadUsers$.subscribe(result => {
        expect(result.payload).toEqual(userList);
      });

    });
  });

});
