// for events 
export interface EventType {
    eventName: string,
    eventDate: string,
    eventTime: string,
    eventInfo: string,
    presenterInfo: string,
    eventRating?: number | undefined
}

export interface RightSideType{
    name : string,
    discription: string
}


// for presenters
// export interface PresenterType{
//     presenterName: string,
//     presenterDiscription : string
// }