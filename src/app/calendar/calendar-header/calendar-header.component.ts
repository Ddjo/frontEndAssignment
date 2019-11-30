import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, users } from 'src/app/reducers/';
import { UpdateUsersFilter } from 'src/app/actions/user/user.actions';
@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {

  @ViewChild('datePicker', {static: false}) datePicker: any;

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

  ngOnInit() {
  }

  openDatePicker() {
    this.datePicker.toggle();
  }

  getUserFromId(id) {
    return this.usersToDisplay.find( x => x.value === id);
  }

  changeSelectedUsers(event) {
    this.store.dispatch(new UpdateUsersFilter(event.value));
  }

}
