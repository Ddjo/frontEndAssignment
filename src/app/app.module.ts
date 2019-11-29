import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { UsersService } from './users/users.service';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import {CalendarModule} from 'primeng/calendar';
import { EventComponent } from './event/event.component';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule } from '@angular/cdk/drag-drop';
import {DropdownModule} from 'primeng/dropdown';
import { SingleTimeNumberPipePipe } from './shared/pipes/single-time-number-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    EventComponent,
    SingleTimeNumberPipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule,
    FullCalendarModule,
    MultiSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    DropdownModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EventComponent
  ]
})
export class AppModule { }
