import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SingleTimeNumberPipe } from '../shared/pipes/single-time-number-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { reducers, userReducer, initialUserState } from '../reducers';
import { Calendar } from 'primeng/calendar/calendar';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { LoadUsersComplete, RemoveEventForUser } from '../actions/user/user.actions';

const usersArray = [
  {
    'value': 1,
    'label': 'user A',
    'color': 'purple',
    'selected' : false,
    'events' : [
        {
            'id': 1,
            'title': 'All Day Event',
            'start': '2019-12-07',
            'extendedProps': {
                'userId': 1,
                'entireDay': true
              }
        },
        {
          'id': 2,
          'title': 'All Day Event',
          'start': '2019-12-07',
          'extendedProps': {
              'userId': 1,
              'entireDay': true
            }
      }
    ]
},
];


const users = [
  {
    'id': 1,
    'name': 'user A',
    'color': 'purple',
    'selected' : false,
    'events' : [
        {
            'id': 1,
            'title': 'All Day Event',
            'start': '2019-12-07',
            'extendedProps': {
                'userId': 1,
                'entireDay': true
              }
        },
        {
          'id': 2,
          'title': 'All Day Event',
          'start': '2019-12-07',
          'extendedProps': {
              'userId': 1,
              'entireDay': true
            }
      }
    ]
},
];

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventComponent,
      SingleTimeNumberPipe ],
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers)
      ],
      // providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // const action = new LoadUsersComplete(users);
    // const result = userReducer(initialUserState, action);

    component.currentEvent = {
      id: 1,
      start: '2019-12-02',
      title: 'test',
      extendedProps: {
        entireDay: false,
        userId: 1
      }
    };

    // mockStore = TestBed.get(Store);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges should feed form', () => {
    component.currentEvent = {
      id: 0,
      start: '',
      title: 'title',
      extendedProps: {
        entireDay: false,
        userId: 0
      }
    };

    component.ngOnChanges();

    expect(component.eventForm.controls.title.value).toEqual('title');
  });

  it('ngOnChanges should feed form with hours', () => {
    component.currentEvent = {
      id: 0,
      start: '2019-12-07T16:54:00',
      end: '2019-12-08T14:23:00',
      title: 'title',
      extendedProps: {
        entireDay: false,
        userId: 0
      }
    };

    component.ngOnChanges();

    expect(component.eventForm.controls.startHour.value).toEqual(16);
    expect(component.eventForm.controls.startMinutes.value).toEqual(54);
    expect(component.eventForm.controls.endHour.value).toEqual(14);
    expect(component.eventForm.controls.endMinutes.value).toEqual(23);
  });


  it('Should empty the end date', () => {

      component.eventForm.controls.startDate.setValue(new Date(2019, 12, 2));
      component.eventForm.controls.endDate.setValue(new Date(2019, 11, 3));

      component.onChangeStartDate();

      expect(component.eventForm.controls.endDate.value).toEqual('');
    });

    // it('Should create event', () => {

    //   const action = new LoadUsersComplete(users);
    //   const result = userReducer(initialUserState, action);

    //   component.eventForm.controls['title'].setValue('test');
    //   component.eventForm.controls['user'].setValue(1);
    //   component.eventForm.controls['startDate'].setValue(new Date());
    //   component.eventForm.controls['startHour'].setValue('');
    //   component.eventForm.controls['startMinutes'].setValue('');
    //   component.eventForm.controls['endDate'].setValue('');
    //   component.eventForm.controls['endHour'].setValue('');
    //   component.eventForm.controls['endMinutes'].setValue('');
    //   component.eventForm.controls['entireDay'].setValue(true);

    //   component.isNewEvent = true;

    //   component.saveEvent();

    //   expect('').toEqual('');
    // });

    // it('Should update event', () => {

    //   component.eventForm.controls['title'].setValue('test');
    //   component.eventForm.controls['user'].setValue(1);
    //   component.eventForm.controls['startDate'].setValue(new Date());
    //   component.eventForm.controls['startHour'].setValue('');
    //   component.eventForm.controls['startMinutes'].setValue('');
    //   component.eventForm.controls['endDate'].setValue('');
    //   component.eventForm.controls['endHour'].setValue('');
    //   component.eventForm.controls['endMinutes'].setValue('');
    //   component.eventForm.controls['entireDay'].setValue(true);

    //   component.isNewEvent = false;

    //   component.saveEvent();

    //   expect('').toEqual('');
    // });

    // it('Should delete event', () => {

    //   component.eventForm.controls['title'].setValue('test');
    //   component.eventForm.controls['user'].setValue(1);
    //   component.eventForm.controls['startDate'].setValue(new Date());
    //   component.eventForm.controls['startHour'].setValue('');
    //   component.eventForm.controls['startMinutes'].setValue('');
    //   component.eventForm.controls['endDate'].setValue('');
    //   component.eventForm.controls['endHour'].setValue('');
    //   component.eventForm.controls['endMinutes'].setValue('');
    //   component.eventForm.controls['entireDay'].setValue(true);

    //   component.isNewEvent = false;

    //   component.removeEvent();

    //   expect('').toEqual('');
    // });

    // it('should dispatch the removeEvent action when removeEvent is invoked', () => {
    //   const action = new RemoveEventForUser(users[0].events[0]);

    //   component.eventForm.controls['title'].setValue('test');
    //   component.eventForm.controls['user'].setValue(1);
    //   component.eventForm.controls['startDate'].setValue(new Date());
    //   component.eventForm.controls['startHour'].setValue('');
    //   component.eventForm.controls['startMinutes'].setValue('');
    //   component.eventForm.controls['endDate'].setValue('');
    //   component.eventForm.controls['endHour'].setValue('');
    //   component.eventForm.controls['endMinutes'].setValue('');
    //   component.eventForm.controls['entireDay'].setValue(true);

    //   fixture.detectChanges();

    //   component.removeEvent();

    //   // expect(spy).toHaveBeenCalledWith(action);
    // });
});
