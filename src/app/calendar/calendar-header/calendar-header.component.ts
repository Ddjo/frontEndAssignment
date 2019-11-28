import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss']
})
export class CalendarHeaderComponent implements OnInit {

  @ViewChild('datePicker', {static: false}) datePicker: any;

  users: IUser[] = [];

  constructor(private usersService: UsersService) { 
    this.usersService.getUsers().subscribe((users) => {
        // Return user list formatted in order to be multiselected
      this.users = users.map(user => {
        return {value: user.id, label: user.name};
      });
    });
  }

  ngOnInit() {
  }

  openDatePicker() {
    this.datePicker.toggle();
  }

}
