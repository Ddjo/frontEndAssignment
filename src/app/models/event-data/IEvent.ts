
export interface IEvent {
    title: string;
    start: Date;
    end?: Date;
    extendedProps: {
        userId: number;
        entireDay: boolean
    };
}
