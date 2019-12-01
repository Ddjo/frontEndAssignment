import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, users } from 'src/app/reducers/';
import { ToggleUserVisibility } from 'src/app/actions/user/user.actions';
import { EventEmitter } from 'events';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent {

  @ViewChild('datePicker', {static: false}) datePicker: any;
  @Output() goToDate = new Subject<Date>();

  // users$: Observable<UserData[]>;
  usersToDisplay: any[] = [];
  selectedUsers: string[] = [];

  constructor(private store: Store<AppState>) {
    // Get the user list from the store to display it in the dropdown list
    this.store.pipe(select(users)).subscribe(usersList => {
      this.usersToDisplay = usersList.map(user => {
        return {value: user.id, label: user.name, color: user.color};
      });
    });
  }

  openDatePicker() {
    this.datePicker.toggle();
  }

  dateSelected(date) {
    this.goToDate.next(date);
  }

  getUserFromId(id) {
    return this.usersToDisplay.find( x => x.value === id);
  }

  changeSelectedUsers(event) {
    this.store.dispatch(new ToggleUserVisibility(event.itemValue));
  }

}
