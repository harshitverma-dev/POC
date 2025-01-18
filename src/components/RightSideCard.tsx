import { Button } from 'primereact/button'
import React, { useContext } from 'react'
// import { RightSideType } from '../interface/EventInterface'
import { ProductContextData } from '../context/ContextData'
import { userPresentersI } from '../interface/Presenters'
import { useNavigate } from 'react-router-dom'
import { EventType } from '../interface/EventInterface'

interface RightSideProps {
    rightSideData: userPresentersI | EventType
}

const RightSideCard: React.FC<RightSideProps> = (props) => {
    // const navigate = useNavigate()
    console.log(props)
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { rightSideData } = props
    const { setPresentersDetailsPopupValue , setPresentersDetailsPopup } = context;
    // const { presentersData} = props

    const handlePopupData = () =>{
        if(!isEventType(rightSideData)){
            setPresentersDetailsPopup(rightSideData)
            setPresentersDetailsPopupValue(true)
        }
    }
  
    // const { setPresentersDetailsPopupValue , setPresentersDetailsPopup } = context;
 
    const isEventType = (data: userPresentersI | EventType): data is EventType => 'description' in data && typeof data.description === 'string';;
    // console.log(isEventType(rightSideData) && rightSideData?.description)
    return (
        <div>

            <h4 className='capitalize font-medium text-xl mb-3 text-[#474747]'>{isEventType(rightSideData) ? rightSideData?.eventName : rightSideData?.name}</h4>
            <div>
                <p className='text-[15px] text-[#5e5e5e] textinThreeLine'>{isEventType(rightSideData) ? rightSideData?.description : rightSideData?.introduction}</p>
                {
                    !isEventType(rightSideData) && rightSideData?.role == 'PROFESSOR' &&   <div className='readMoreBtnContainer flex justify-end'>
                    <Button className='px-0 pb-0' label="Read Profie" link onClick={handlePopupData} />
                </div>
                }
              
            </div>
        </div>
    )
}

export default RightSideCard
