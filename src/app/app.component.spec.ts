import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event/event.component';
import { CalendarHeaderComponent } from './calendar/calendar-header/calendar-header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SingleTimeNumberPipe } from './shared/pipes/single-time-number-pipe.pipe';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CalendarComponent,
        CalendarHeaderComponent,
        EventComponent,
        SingleTimeNumberPipe,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot(reducers),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});