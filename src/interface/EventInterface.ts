// for events 
export interface EventType {
    _id?: string | any
    eventName: string,
    description: string,
    fromDateTime: string,
    toDateTime: string,
    presenterId?: string,
    org?: string,
    attendees : number | string
}

export interface RightSideType{
    name? : string,
    introduction?: string,
    eventName? : string,
    description? : string
}


// for presenters
// export interface PresenterType{
//     presenterName: string,
//     presenterDiscription : string
// }