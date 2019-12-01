import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { OptionsInput, Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IEvent } from '../models/event-data/IEvent';
import { Store, select } from '@ngrx/store';
import { AppState, users } from '../reducers/';
import { LoadUsers } from '../actions/user/user.actions';
import { IUser } from '../models/user-data/IUser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @ViewChild('eventModal', {static: false}) eventModal: ElementRef;
  @ViewChild('fullCalendar', {static: false}) fullCalendar;

  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarHeaders = {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  };
  calendarWeekends = true;

  events: IEvent[];
  selectedEvent: IEvent;

  constructor(private renderer: Renderer2, private store: Store<AppState>) {
    this.store.dispatch(new LoadUsers());

    // Get the event list of the selected users from the store
    this.store.pipe(select(users)).subscribe(usersList => {
      this.events = [];

      usersList.filter(x => x.selected === true).forEach(user => {
        this.events  = this.events.concat(this.addColorToEvents(user));
      });

    });
  }

  addColorToEvents(user: IUser): IEvent[] {
    // Add color to the event depending on the user
    return user.events.map(event => ({...event, color: user.color}));
  }

  eventClick(eventCliked: IEvent) {
    this.selectedEvent = eventCliked;
  }

  dateClick(event) {
    this.selectedEvent = {
      id: null,
      title: '',
      start: event.date,
      extendedProps : {
        entireDay: event.allDay,
        userId: null
      }
    };
  }

  goToDate(date) {
    this.fullCalendar.calendar.gotoDate(date);
  }

  closeEventModal() {
    // Add a css class to make a disappearing animation
    this.renderer.addClass(this.eventModal.nativeElement, 'modal-disappear');

    // Reset the selected event after 0.2s
    setTimeout(() => {
      this.selectedEvent = null;
    }, 200);
  }
}
