import { Button } from 'primereact/button'
import React from 'react'
import { RightSideType } from '../interfaces/EventInterface'

interface RightSideProps {
    rightSideData: RightSideType
}

const RightSideCard: React.FC<RightSideProps> = (props) => {
    const { rightSideData } = props
    return (
        <div>
            <h4>{rightSideData.name}</h4>
            <div>
                <p>{rightSideData.discription}</p>
                <div className='readMoreBtnContainer flex justify-end'>
                <Button className='px-0 pb-0' label="Read More" link onClick={() => window.open('https://react.dev', '_blank')} />
                </div>
            </div>
        </div>
    )
}

export default RightSideCard
