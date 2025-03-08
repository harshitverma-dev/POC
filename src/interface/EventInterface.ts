// for events 
export interface EventType {
    _id?: string | any
    eventName: string,
    description: string,
    fromDateTime: string,
    toDateTime: string,
    presenterId?: string,
    org?: string,
    attendees : number | string,
    rating?: string | number
}

export interface RightSideType{
    name? : string,
    introduction?: string,
    eventName? : string,
    description? : string
}
