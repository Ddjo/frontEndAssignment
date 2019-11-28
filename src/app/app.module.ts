import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { UsersService } from './users/users.service';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    FullCalendarModule,
    MultiSelectModule,
    HttpClientModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
