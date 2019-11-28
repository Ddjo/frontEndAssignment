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
          'userId': 1,
          'color': 'purple'
      },
      {
          'title': 'Long Event',
          'start': '2019-11-07',
          'end': '2019-11-10'
      },
      {
          'title': 'Repeating Event',
          'start': '2019-11-09T16:00:00'
      },
      {
          'title': 'Repeating Event',
          'start': '2019-11-16T16:00:00'
      },
      {
          'title': 'Conference',
          'start': '2019-11-11',
          'end': '2019-11-13'
      }
  ];
  }

  eventClick(event: IEvent) {
    this.selectedEvent = event;
  }

  dateClick(event) {
    console.log(event);
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
