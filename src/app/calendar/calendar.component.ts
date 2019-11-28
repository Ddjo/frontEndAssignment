import { Component, OnInit } from '@angular/core';
import { OptionsInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { UsersService } from '../users/users.service';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: OptionsInput;

  constructor() {
  }

  ngOnInit() {
      this.calendarOptions = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          defaultDate: Date.now(),
          defaultView: 'timeGridWeek',
          header: {
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          editable: true,
      };
  }

}
