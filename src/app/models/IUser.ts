export interface IUser {
    id: number,
    name: string,
    events: IEvent[]
}

export interface IEvent {
    title: string
    start: Date,
    end?: Date
}