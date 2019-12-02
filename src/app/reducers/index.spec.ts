import {
    LoadUsers,
    LoadUsersComplete,
    CreateEventForUser,
    UpdateEventForUser,
    RemoveEventForUser,
    ToggleUserVisibility,
     } from '../actions/user/user.actions';
import { initialUserState, userReducer } from './index';
import { UserData } from '../models/user-data/user-data';
import { EventData } from '../models/event-data/event-data';

describe('User Reducer', () => {
  const userTest: UserData =       {
    'id': 1,
    'name': 'user test',
    'color': 'purple',
    'selected' : false,
    'events' : [
        {
            'id': 1,
            'title': 'Event Id 1',
            'start': '2019-12-07',
            'extendedProps': {
                'userId': 1,
                'entireDay': true
            }
        },
        {
            'id': 2,
            'title': 'Event Id 2',
            'start': '2019-12-07',
            'extendedProps': {
                'userId': 1,
                'entireDay': true
            }
      }
    ]
    };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = userReducer(undefined, action);

      expect(result).toBe(initialUserState);
    });
  });

  describe('[User] Load Users', () => {
    it('should toggle loading state', () => {
      const action = new LoadUsers();
      const result = userReducer(initialUserState, action);

      expect(result).toEqual(initialUserState);
    });
  });

  describe('[User] Load User Success', () => {
    it('should load a user to state', () => {
      const action = new LoadUsersComplete([userTest]);
      const result = userReducer(initialUserState, action);

      expect(result.users[0]).toEqual(
        userTest
      );
    });
  });

  describe('[User] Toggle user visibility', () => {
    it('should set the first user as visible', () => {

        const state = userReducer(
            initialUserState,
            new LoadUsersComplete([userTest])
        );

        const action = new ToggleUserVisibility(1);
        const result = userReducer(state, action);

      expect(result.users[0].selected).toEqual(
        true
      );
    });
  });

  describe('[User] Create event for User', () => {
    it('should create event for the user', () => {

      const event: EventData = {
        id: 10,
        title: 'event test',
        start: '2019-12-01',
        extendedProps: {
            entireDay: true,
            userId: 1
        }
      };

        const state = userReducer(
            initialUserState,
            new LoadUsersComplete([userTest])
        );

        const action = new CreateEventForUser(event);
        const result = userReducer(state, action);

      expect(result.users[0].events.find(x => x.id === 10).title).toEqual(
        'event test'
      );
    });
  });

  describe('[User] Update event for User', () => {
    it('should update the first event of the user', () => {

      const event = userTest.events[0];
      event.title = 'new title';

      const state = userReducer(
        initialUserState,
        new LoadUsersComplete([userTest])
    );

    const action = new UpdateEventForUser(event);
    const result = userReducer(state, action);

      expect(result.users[0].events[0].title).toEqual(
        'new title'
      );
    });
  });

  describe('[User] Remove event for User', () => {
    it('should remove the first event of the user', () => {

      const eventTitle = userTest.events[0].title;
      const event = userTest.events[0];

      const state = userReducer(
        initialUserState,
        new LoadUsersComplete([userTest])
    );

    const action = new RemoveEventForUser(event);
    const result = userReducer(state, action);

      expect(result.users[0].events[0].title).not.toEqual(
        eventTitle
      );
    });
  });
});
