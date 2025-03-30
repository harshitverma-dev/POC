import { Dialog } from 'primereact/dialog';
import React, { useContext } from 'react'
import { ProductContextData } from '../context/ContextData';
// import { Card } from 'primereact/card';
// import { Tag } from 'primereact/tag';
// import { Button } from 'primereact/button';
import modifiedEventDate from '../helpers/DateFormate';

const EventDetailPopup: React.FC = () => {
       const context = useContext(ProductContextData);
        if (!context) {
            throw new Error('it should not be null');
        }
        const { eventsDetailsPopupValue, eventsDetailsPopup, setEventsDetailsPopupValue } = context;
    return (
        <Dialog position={'top'} header={eventsDetailsPopup?.eventName} draggable={false} dismissableMask visible={eventsDetailsPopupValue} onHide={() => { if (!eventsDetailsPopupValue) return; setEventsDetailsPopupValue(false); }} className='w-full md:max-w-[65vw]'>
                <p className="text-gray-600 mt-2">{eventsDetailsPopup?.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <h4 className="font-semibold text-gray-700">Location</h4>
                        <p className="text-gray-600">{eventsDetailsPopup?.place}</p>
                    </div>
                    {/* <div>
                        <h4 className="font-semibold text-gray-700">Organizer</h4>
                        <p className="text-gray-600">{eventsDetailsPopup?.org}</p>
                    </div> */}
                    <div>
                        <h4 className="font-semibold text-gray-700">Date & Time</h4>
                        <p className="text-gray-600">
                            {modifiedEventDate(eventsDetailsPopup?.toDateTime)}
                        </p>
                    </div>
                    {/* <div>
                        <h4 className="font-semibold text-gray-700">Attendees</h4>
                        <p className="text-gray-600">{eventsDetailsPopup?.attendees}</p>
                    </div> */}
                </div>

        </Dialog>
    )
}

export default EventDetailPopup