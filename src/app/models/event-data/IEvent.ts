
export interface IEvent {
    id: number;
    title: string;
    start: string;
    end?: string;
    extendedProps: {
        userId: number;
        entireDay: boolean
    };
}
