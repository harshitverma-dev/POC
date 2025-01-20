import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import React, { useContext, useState } from 'react'
import { ProductContextData } from '../context/ContextData'
import axios from 'axios'
import { Password } from 'primereact/password'

const LoginForm: React.FC = () => {
    const [loginErrMsg, storeLoginErrMsg] = useState([])
    const [loginLoader, setLoginLoader] = useState(false);
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { logInPopupValue, setLoginPopupValue, setLoginForm, getAllUpcomingEventsDataByApi,loginForm, setLoginUserDetail } = context;

    const onchangeFun = (e: any) => {
        const { name, value } = e.target;
        setLoginForm({
            ...loginForm,
            [name]: value
        })
        storeLoginErrMsg([]);
    }

    // log in user
    const loginUserApi = () => {
        // console.log(import.meta, 'kp')
        setLoginLoader(true);
        let url = `${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/login`
        let payload = {
            email: loginForm.userEmail,
            password: loginForm.userPassword
        }

        axios.post(url, payload).then((response) => {
            // console.log(response, 'dddddddddddd');
            setLoginUserDetail(response.data.custProfile)
            localStorage.setItem('userProfile', JSON.stringify(response.data.custProfile));
            // setUserProfieData()
            localStorage.setItem('userAccessToken', response.data.token);
            storeLoginErrMsg([]);
            setLoginPopupValue(false);
            setLoginLoader(false)
            getAllUpcomingEventsDataByApi();
        }).catch(err => {
            console.log(err, 'err')
            setLoginLoader(false)
            // alert(err.response.data.message)
            storeLoginErrMsg(err.response.data.message)
        })
    }
    return (
        <Dialog header="Log in" dismissableMask visible={logInPopupValue} position={'top'} style={{ minWidth: '30vw' }} onHide={() => { if (!logInPopupValue) return; setLoginPopupValue(false); }} draggable={false} resizable={false}>
            <p className="m-0">
                <div className='logInFormContainer'>
                    <div className="card">
                        {/* <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Log In</h3> */}
                        <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                            <label htmlFor="userEmail" className="">Email :</label>
                            <InputText value={loginForm.userEmail} onChange={onchangeFun} id="userEmail" name='userEmail' placeholder="Enter the user name" className="mr-2 w-full" />
                        </div>
                        <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                            <label htmlFor="userPassword" className="">Password :</label>
                            <Password value={loginForm.userPassword} onChange={onchangeFun} id="userPassword" name='userPassword' placeholder="Enter the password" className="mr-2 !w-full" feedback={false} toggleMask />
                        </div>
                        {
                            Array.isArray(loginErrMsg) ? loginErrMsg?.map((items) => {
                                return (
                                    <div className='text-red-500'>{items}</div>
                                )
                            }) : <div className='text-red-500'>{loginErrMsg}</div>
                        }
                        <Button label='Login' loading={loginLoader ? true : false} onClick={loginUserApi} className='mt-2' />
                    </div>
                </div>
            </p>
        </Dialog>
    )
}

export default LoginForm
