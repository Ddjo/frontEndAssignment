import { IEvent } from './IEvent';

export class EventData implements IEvent {
  title = '';
  start = new Date();
  extendedProps = {
    userId: 0,
    entireDay: false
  };
}
