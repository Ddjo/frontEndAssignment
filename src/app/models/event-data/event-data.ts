import { IEvent } from './IEvent';

export class EventData implements IEvent {
  title = '';
  start = '';
  extendedProps = {
    userId: 0,
    entireDay: false
  };
}
