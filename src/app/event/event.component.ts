import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IEvent, IUser } from '../models/IUser';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnChanges {

  @Input() currentEvent: IEvent;

  eventForm: FormGroup = new FormGroup({
    title: new FormControl(),
    startDate: new FormControl(),
    startTime: new FormControl(),
    endDate: new FormControl(),
    endTime: new FormControl(),
    entireDay: new FormControl(),
    user: new FormControl(),
  });

  hoursArray: string[] = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23'];
  minutesArray: string[] = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

  usersArray: IUser[];

  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe((users) => {
        this.usersArray = users;
      });
  }

  ngOnChanges() {
    this.eventForm.controls['title'].setValue(this.currentEvent.title);
    this.eventForm.controls['startDate'].setValue(this.currentEvent.start);
    this.eventForm.controls['endDate'].setValue(this.currentEvent.end);
    this.eventForm.controls['entireDay'].setValue(true);
  }

}
