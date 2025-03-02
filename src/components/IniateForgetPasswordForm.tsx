import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useContext, useRef, useState } from 'react'
import { ProductContextData } from '../context/ContextData'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toast } from 'primereact/toast'

const InitateForgetPasswordForm: React.FC = () => {
    const [vaildEmailError, setValidEmailError] = useState(false)
    const navigate = useNavigate()
    const toast = useRef<Toast>(null)
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { initateForgetPasswordPopupValue, setInitateForgetPasswordPopupValue, forgetPasswordForEmail, setForgetPasswordForEmail } = context;


    // log in user
    const initiateLoginPasswordFun = () => {
        // console.log('ssss')
        if (!forgetPasswordForEmail.includes('@gmail.com')) {
            setValidEmailError(true)
            return false;
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/forgot-passowrd-initiate?email=${forgetPasswordForEmail}`).then((res) => {
            console.log(res)
            if (res.data.refrenceId) {
                navigate(`/profile/forgot-password-reset?refrenceId=${res.data.refrenceId}`);
                setInitateForgetPasswordPopupValue(false);
                setForgetPasswordForEmail('')
            }
        }).catch(err => {
            console.log(err);
            toast?.current?.show({ severity: 'error', summary: 'Error', detail: err.response?.data?.message });
        })
    }
    // Navigate(`/forgot-password-reset/`)

    const onChangeFun = (e: any) => {
        setForgetPasswordForEmail(e.target.value)
        setValidEmailError(false)
    }
    return (
        <>
            <Dialog header="Reset Password" dismissableMask visible={initateForgetPasswordPopupValue} position={'top'} style={{ minWidth: '30vw' }} onHide={() => { if (!initateForgetPasswordPopupValue) return; setInitateForgetPasswordPopupValue(false); }} draggable={false} resizable={false}>
                <p className="m-0">
                    <div className='logInFormContainer'>
                        <div className="card">
                            <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                                <label htmlFor="userEmail" className="">Enter Email :</label>
                                <InputText value={forgetPasswordForEmail} onChange={onChangeFun} id="userEmailForForget" name='userEmailForForget' placeholder="Enter the user name" className="mr-2 w-full" />
                            </div>
                            {
                                vaildEmailError && <div className='text-red-500'>Please enter void email</div>
                            }
                            <Button disabled={forgetPasswordForEmail? false : true} label='Submit' onClick={initiateLoginPasswordFun} className='mt-2' />
                        </div>
                    </div>
                </p>
            </Dialog>
            <Toast ref={toast} />
        </>
    )
}

export default InitateForgetPasswordForm
