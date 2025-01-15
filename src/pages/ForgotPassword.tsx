import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
// import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState({
        newPassword: '',
        confirmNewPassword: ''
    })
    const [URLSearchParams] = useSearchParams();
    // console.log(URLSearchParams.get('refrenceId'), URLSearchParams)
    const [newPasswordError, setNewPasswordError] = useState({
        emptyPassword: false,
        notBothFieldsSame: false
    })
    const [isLoadingForNewPassword, setisLoadingForNewPassword] = useState(false)
    const toast = useRef<Toast>(null)
    const onChangeFun = (e: any) => {
        const { name, value } = e.target;
        setNewPassword({
            ...newPassword,
            [name]: value
        })
        setNewPasswordError({
            emptyPassword: false,
            notBothFieldsSame: false
        })
    }

    const newPasswordFun = () => {
        // console.log('new')
        setisLoadingForNewPassword(true);
        if (!newPassword.newPassword || !newPassword.confirmNewPassword) {
            setNewPasswordError({
                ...newPasswordError,
                emptyPassword: true
            });
            setisLoadingForNewPassword(false);
            return false;
        }
        if (newPassword.newPassword !== newPassword.confirmNewPassword) {
            setNewPasswordError({
                ...newPasswordError,
                notBothFieldsSame: true
            });
            setisLoadingForNewPassword(false);
            return false;
        }
        axios.post('http://localhost:3000/university-student/profile/v1/forgot-passowrd-reset', {
            refrenceId: URLSearchParams.get('refrenceId'),
            newPassword: newPassword.confirmNewPassword
        }).then((res) => {
            console.log(res)
            setisLoadingForNewPassword(false)
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Updated !' });
            setNewPassword({
                newPassword: '',
                confirmNewPassword: ''
            })
        }).catch(err => {
            console.log(err)
            setisLoadingForNewPassword(false)
        })
    }
    return (
        <div className='md:w-1/2 m-auto addChangePasswordContainer rounded p-5'>
            <div className="card">
                {/* <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Update Password</h3> */}
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="currentPassword" className="">Enter new Password:</label>
                    <InputText id="currentPassword" type='text' value={newPassword.newPassword} onChange={onChangeFun} name='newPassword' placeholder="Enter new password" className="mr-2 w-full" />
                    {/* {(updatePasswordError.currentPasswordError && !updatePassword.currentPassword) && <Message severity="error" className='p-1' text="Current password is required" />} */}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="newPassword" className="">Enter confirm new Passowrd:</label>
                    <InputText id="newPassword" type='text' value={newPassword.confirmNewPassword} onChange={onChangeFun} name='confirmNewPassword' placeholder="Enter new confirm password" className="mr-2 w-full" />
                    {/* {(updatePasswordError.newPasswordError && !updatePassword.newPassword) && <Message severity="error" className='p-1' text="New Password is required" />} */}
                </div>
                {
                    newPasswordError.emptyPassword && <div className='text-red-500 mb-2'>Both fields are required.</div>
                }
                {
                    newPasswordError.notBothFieldsSame && <div className='text-red-500 mb-2'>new password and confirm new password should be same.</div>
                }
                <Button loading={isLoadingForNewPassword ? true : false} label="Update" onClick={newPasswordFun} />
            </div>
            <Toast ref={toast} />
        </div>
    )
}

export default ForgotPassword;
