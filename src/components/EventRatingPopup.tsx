import React, { useContext, useEffect, useState } from 'react'
import { ProductContextData } from '../context/ContextData';
import { Dialog } from 'primereact/dialog';
import { Rating, RatingChangeEvent } from 'primereact/rating';
// import { Rating } from 'flowbite-react';

const EventRatingPopup: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    // const { ratingPopupVisible, setRatingPopupVisible } = context;
    const [storeGivenRating, setStoreEventRating] = useState<number | null>(null)

    useEffect(() => {

    })


    return (
        <Dialog header="Event Rating" dismissableMask visible={false} position={'top'} style={{ width: '30vw' }} onHide={() => { if (!false) return }} draggable={false} resizable={false}>
            <p className="m-0">
                <div className='logInFormContainer'>
                    <div className="card">
                        {/* <h3 className='text-[24px] md:text-[28px] lg:text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Log In</h3> */}
                        {/* <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                  <label htmlFor="userEmail" className="">Email :</label>
                                  <InputText value={loginForm.userEmail} onChange={onchangeFun} id="userEmail" name='userEmail' placeholder="Enter the user name" className="mr-2 w-full" />
                              </div> */}
                        {/* <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                  <label htmlFor="userPassword" className="">Password :</label>
                                  <Password value={loginForm.userPassword} onChange={onchangeFun} id="userPassword" name='userPassword' placeholder="Enter the password" className="mr-2 !w-full" feedback={false} toggleMask/>
                              </div> */}
                        {/* {
                                 Array.isArray(loginErrMsg) ?  loginErrMsg?.map((items) => {
                                  return (
                                      <div className='text-red-500'>{items}</div>
                                  )
                              }):  <div className='text-red-500'>{loginErrMsg}</div>
                              } */}
                        <Rating value={storeGivenRating ?? 0} onChange={(e: RatingChangeEvent) => setStoreEventRating(e.value || 0)} stars={10} />
                        {/* <Button label='Login' onClick={loginUserApi} className='mt-2'/> */}
                    </div>
                </div>
            </p>
        </Dialog>
    )
}

export default EventRatingPopup
