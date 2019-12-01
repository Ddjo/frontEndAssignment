
export interface IEvent {
    title: string;
    start: string;
    end?: string;
    extendedProps: {
        userId: number;
        entireDay: boolean
    };
}
