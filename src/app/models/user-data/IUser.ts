import { IEvent } from '../event-data/IEvent';

export interface IUser {
    id: number;
    name: string;
    color: string;
    events: IEvent[];
}
