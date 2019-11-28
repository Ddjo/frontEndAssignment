import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { OptionsInput, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventComponent } from '../event/event.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { IEvent } from '../models/IUser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('eventModal', {static: false}) eventModal: ElementRef;

  calendarOptions: OptionsInput;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarHeaders = {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  };
  calendarWeekends = true;

  events: any[];
  selectedEvent: IEvent;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {

    this.events = [
      {
          'id': 9999,
          'title': 'All Day Event',
          'start': '2019-11-28',
          'color': 'purple',
          extendedProps: {
            'userId': 1,
            'entireDay': true
          },
      },
      {
          'title': 'Long Event',
          'start': '2019-11-07',
          'end': '2019-11-10',
          extendedProps: {
            'userId': 1,
            'entireDay': true
          },
      },
      {
          'title': 'Repeating Event',
          'start': '2019-11-09T16:00:00',
          extendedProps: {
            'userId': 1,
            'entireDay': false
          },
      },
      {
          'title': 'Repeating Event',
          'start': '2019-11-27T16:54:00',
          'end': '2019-11-28T12:12:00',
          extendedProps: {
            'userId': 1,
            'entireDay': false
          },
      },
      {
          'title': 'Conference',
          'start': '2019-11-11',
          'end': '2019-11-13',
          extendedProps: {
            'userId': 1,
            'entireDay': true
          },
      }
  ];
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
