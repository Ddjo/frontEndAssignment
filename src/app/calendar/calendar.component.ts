import { Component, OnInit } from '@angular/core';
import { OptionsInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events = [
    // {
    //     'title': 'All Day Event',
    //     'start': '2019-11-01'
    // },
    // {
    //     'title': 'Long Event',
    //     'start': '2019-11-07',
    //     'end': '2019-11-10'
    // },
    // {
    //     'title': 'Repeating Event',
    //     'start': '2019-11-09T16:00:00'
    // },
    // {
    //     'title': 'Repeating Event',
    //     'start': '2019-11-27T16:00:00'
    // },
    // {
    //     'title': 'Conference',
    //     'start': '2019-11-11',
    //     'end': '2019-11-13'
    // }
];

  options: OptionsInput;
  constructor() { }

  ngOnInit() {
      // this.eventService.getEvents().then(events => {this.events = events;});
      this.options = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          defaultDate: Date.now(),
          defaultView: 'timeGridWeek',
          header: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          editable: true,
          locale: 'fr-FR',
      };
  }

}
