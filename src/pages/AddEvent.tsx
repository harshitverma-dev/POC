import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Calendar } from 'primereact/calendar';
// import { FloatLabel } from 'primereact/floatlabel';
import { Nullable } from "primereact/ts-helpers";
import { Button } from 'primereact/button';

const AddEvent: React.FC = () => {
    const [date, setDate] = useState<Nullable<Date>>(null);

    // console.log(props, eventData)
    const [selectedCity, setSelectedCity] = useState();
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    return (
        // create
        <div>
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                placeholder="Select a City" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                placeholder="Select a City" className="w-full mb-3" checkmark={true} highlightOnSelect={false} />
            <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={'sss'} />
            <InputTextarea autoResize value={'ss'} rows={5} className='w-full mb-3' />
            <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={'ss'} />
            {/* <FloatLabel> */}
            <Calendar ariaLabel='bbbbb' showTime inputId="birth_date" hourFormat="12" value={date} onChange={(e) => setDate(e.value)} className='w-full mb-3' />
            {/* <label htmlFor="birth_date">Birth Date</label> */}
            {/* </FloatLabel> */}
            <InputText type="text" placeholder="Normal" className="p-inputtext-sm w-full mb-3" value={'ss'} />
            <div className='text-center'>
                <Button label="Save As Draft" className='mr-3' outlined rounded />
                <Button label="Post" outlined rounded />
            </div>
        </div>
    )
}

export default AddEvent
