import { IEvent } from './IEvent';

export class EventData implements IEvent {
  id = 0;
  title = '';
  start = '';
  extendedProps = {
    userId: 0,
    entireDay: false
  };
}
