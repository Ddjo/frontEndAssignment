import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { OptionsInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IEvent } from '../models/event-data/IEvent';
import { Store, select } from '@ngrx/store';
import { AppState, selectedUsers } from '../reducers/';
import { LoadUsers } from '../actions/user/user.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @ViewChild('eventModal', {static: false}) eventModal: ElementRef;

  calendarOptions: OptionsInput;
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
    this.store.pipe(select(selectedUsers)).subscribe(users => {
      this.events = [];

      users.forEach(user => {
        this.events  = this.events.concat(user.events);
      });

    });
  }

  eventClick(event: IEvent) {
    this.selectedEvent = event;
    console.log(this.selectedEvent);
  }

  dateClick(event) {
    console.log(event);

    this.selectedEvent = {
      title: '',
      start: event.date,
      extendedProps : {
        entireDay: event.allDay,
        userId: null
      }
    };
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
