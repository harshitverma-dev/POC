import axios from 'axios';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
// import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react'

const ChangePassword: React.FC = () => {
    const [updatePassword, setUpdatePassword] = useState({
        currentPassword: '',
        newPassword: ''
    })
    const [updatePasswordError, setUpdatePasswordError] = useState({
        currentPasswordError: false,
        newPasswordError: false
    })
    const [isLoadingForUpdatePassword, setisLoadingForUpdatePassword] = useState(false)
    const toast = useRef<Toast>(null)
    const onChangeFun = (e: any) => {
        const { name, value } = e.target;
        setUpdatePassword({
            ...updatePassword,
            [name]: value
        })
    }

    const updatePasswordFun = () => {
        setisLoadingForUpdatePassword(true);
        if (!updatePassword.newPassword || !updatePassword.currentPassword) {
            setUpdatePasswordError({
                currentPasswordError: !updatePassword.currentPassword ? true : false,
                newPasswordError: !updatePassword.newPassword ? true : false
            })
            setisLoadingForUpdatePassword(false);
            return false;
        }
        axios.put(`${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/rest-password`, updatePassword, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((res) => {
            console.log(res)
            setisLoadingForUpdatePassword(false)
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'new Password Updated !' });
        }).catch(err => {
            console.log(err)
            setisLoadingForUpdatePassword(false)
        })
    }
    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    return (
        <div className='md:w-1/2 m-auto addChangePasswordContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Update Password</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="currentPassword" className="">Current Password:</label>
                    <Password toggleMask feedback={false} id="currentPassword" type='text' value={updatePassword.currentPassword} onChange={onChangeFun} name='currentPassword' placeholder="Enter current password" className="mr-2 w-full" />
                    {(updatePasswordError.currentPasswordError && !updatePassword.currentPassword) && <Message severity="error" className='p-1' text="Current password is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="newPassword" className="">New Passowrd:</label>
                    <Password header={header} footer={footer} toggleMask id="newPassword" type='text' value={updatePassword.newPassword} onChange={onChangeFun} name='newPassword' placeholder="Enter new password" className="mr-2 w-full" />
                    {(updatePasswordError.newPasswordError && !updatePassword.newPassword) && <Message severity="error" className='p-1' text="New Password is required" />}
                </div>
                <Button loading={isLoadingForUpdatePassword ? true : false} label="Update" onClick={updatePasswordFun} />
            </div>
            <Toast ref={toast}/>
        </div>
    )
}

export default ChangePassword;
