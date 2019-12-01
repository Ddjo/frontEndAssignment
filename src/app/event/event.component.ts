import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { IEvent } from '../models/event-data/IEvent';
import { Store, select } from '@ngrx/store';
import { AppState, users } from '../reducers';
import { CreateEventForUser } from '../actions/user/user.actions';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnChanges {

  @Input() currentEvent: IEvent;

  isNewEvent: boolean;
  formSubmitted = false;

  // Form declaration
  eventForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    startDate: new FormControl(Validators.required),
    startHour: new FormControl(),
    startMinutes: new FormControl(),
    endDate: new FormControl(),
    endHour: new FormControl(),
    endMinutes: new FormControl(),
    entireDay: new FormControl(),
    user: new FormControl('', Validators.required),
  });

  hoursArray: string[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23'];
  minutesArray: string[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

  usersArray: any[];

  constructor(private userService: UserService, private store: Store<AppState>) {
      // Get the user list from the store to display it in the dropdown list
      this.store.pipe(select(users)).subscribe(usersList => {
        this.usersArray = usersList.map(user => {
          return {value: user.id, label: user.name, color: user.color};
        });
      });
  }

  ngOnChanges() {
    this.eventForm.controls['title'].setValue(this.currentEvent.title);
    this.eventForm.controls['startDate'].setValue(this.currentEvent.start);
    this.eventForm.controls['startHour'].setValue(this.currentEvent.start ? new Date(this.currentEvent.start).getHours() : '');
    this.eventForm.controls['startMinutes'].setValue(this.currentEvent.start ? new Date(this.currentEvent.start).getMinutes() : '');
    this.eventForm.controls['endDate'].setValue(this.currentEvent.end);
    this.eventForm.controls['endHour'].setValue(this.currentEvent.end ? new Date(this.currentEvent.end).getHours() : '');
    this.eventForm.controls['endMinutes'].setValue(this.currentEvent.end ? new Date(this.currentEvent.end).getMinutes() : '');
    this.eventForm.controls['entireDay'].setValue(this.currentEvent.extendedProps.entireDay);
    this.eventForm.controls['user'].setValue(this.currentEvent.extendedProps.userId);

    // If there's no title, identify the event as new one to hide the delete icon
    this.isNewEvent = !this.currentEvent.title;
  }

  onChangeStartDate() {
    // When changing start date, if the end date is before, remove it
    if (this.eventForm.controls.endDate.value < this.eventForm.controls.startDate.value) {
      this.eventForm.controls['endDate'].setValue('');
      this.eventForm.controls['endHour'].setValue('');
      this.eventForm.controls['endMinutes'].setValue('');
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.eventForm.controls; }

  saveEvent() {
    // Set the form as submitted
    this.formSubmitted = true;

    // Check if the form is valid. If it's a new event, create it; otherwise, update it
    if (this.eventForm.valid) {

      this.currentEvent = this.getEventFromForm();

      if (this.isNewEvent) {
        console.log('creating event ' + JSON.stringify(this.currentEvent));
        this.store.dispatch(new CreateEventForUser(this.currentEvent));
      } else {
        console.log('updating event ' + JSON.stringify(this.currentEvent));
      }
    }
  }

  deleteEvent() {
    console.log('deleting event ' + JSON.stringify(this.currentEvent));
  }

  getEventFromForm(): IEvent {
    // Return the event object from the form

    // If the entire day is checked, only save the date; otherwise, save also the time
    let startDate = this.eventForm.controls.startDate.value;
    startDate = this.eventForm.controls.entireDay.value ?
      this.formatDateWithoutHour(startDate) :
      this.formatDateWithHour(startDate, this.eventForm.controls.startHour.value, this.eventForm.controls.startMinutes.value) ;

    let endDate = this.eventForm.controls.endDate.value;
    if (endDate) {
      endDate = this.eventForm.controls.entireDay.value ?
      this.formatDateWithoutHour(endDate) :
      this.formatDateWithHour(endDate, this.eventForm.controls.endHour.value, this.eventForm.controls.endMinutes.value) ;
    }

    const event: IEvent = {
      title: this.eventForm.controls.title.value,
      start: startDate,
      end: endDate,
      extendedProps: {
        entireDay: this.eventForm.controls.entireDay.value,
        userId: this.eventForm.controls.user.value
      }
    };

    return event;
  }

  formatDateWithoutHour(date: Date): string {
    // Return date with the YYYY-MM-DD format
    return  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  formatDateWithHour(date: Date, hour: string, minutes: string): string {
    // Return date with the YYYY-MM-DD HH-MM format
    date.setHours(parseInt(hour, 10), parseInt(minutes, 10));
    return date.toISOString();
  }

}
