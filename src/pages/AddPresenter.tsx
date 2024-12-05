import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
// import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { techExpertiesList, userRoleList } from '../interface/ListOptions';
import { createUserDetailsI } from '../interface/userInterface';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';

const AddPresenter: React.FC = () => {
    const [createUserDetails, setCreateUserDetails] = useState<createUserDetailsI>({
        userName: '',
        userEmail: '',
        userOrg: '',
        userIntroduction: '',
        userRole: '',
        userTechExperties: []
    })

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setCreateUserDetails({
            ...createUserDetails,
            [name]: value
        })
    }

    const SaveUserProfile = () => {
        let url = 'http://13.203.115.50:3000/university-student/profile/v1/user';
        let correctFormatForTechExperties:string[] = [];
        createUserDetails.userTechExperties.forEach((items)=>{
          correctFormatForTechExperties.push(items.id);
        });
        
        let payload = {
            name: createUserDetails.userName,
            email: createUserDetails.userEmail,
            org: createUserDetails.userOrg,
            introduction: createUserDetails.userIntroduction,
            role: createUserDetails.userRole?.id,
            techExperties: correctFormatForTechExperties
        }
        console.log(payload, 'kp')
        axios.post(url, payload).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='md:w-1/2 m-auto addPresenterContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Add Presenter</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userName" className="">Name:</label>
                    <InputText id="userName" value={createUserDetails.userName} name='userName' onChange={onChangeFun} placeholder="Enter the name" className="mr-2 w-full" />
                    {/* <Message severity="error" text="Name is required" /> */}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userEmail" className="">Email:</label>
                    <InputText id="userEmail" value={createUserDetails.userEmail} name='userEmail' onChange={onChangeFun} placeholder="Enter the Email" className="mr-2 w-full" />
                    {/* <Message severity="error" text="Email is required" /> */}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userOrg" className="">Org:</label>
                    <InputText id="userOrg" value={createUserDetails.userOrg} name='userOrg' onChange={onChangeFun} placeholder="Enter org" className="mr-2 w-full" />
                    {/* <Message severity="error" text="Introduction is required" /> */}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userIntroduction" className="">Introduction:</label>
                    <InputTextarea autoResize value={createUserDetails.userIntroduction} name='userIntroduction' onChange={onChangeFun} placeholder='About..' rows={5} cols={30} className='mr-2 w-full' />
                    {/* <Message severity="error" text="Introduction is required" /> */}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userRole" className="">Select a Role:</label>
                    <Dropdown options={userRoleList} name='userRole' value={createUserDetails.userRole} onChange={onChangeFun} optionLabel="label"
                        showClear placeholder="Choose one" className="w-full md:w-14rem" />
                    {/* <Message severity="error" text="Name is required" /> */}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userTechExperties" className="">Tech Experties:</label>
                    <MultiSelect options={techExpertiesList} name='userTechExperties' value={createUserDetails.userTechExperties} onChange={onChangeFun} optionLabel="label" placeholder='Select Experties' className="w-full sm:w-20rem" display="chip" />
                    {/* <Message severity="error" text="Name is required" /> */}
                </div>
                <Button label="Submit" icon="pi pi-circle" onClick={SaveUserProfile} />
            </div>
        </div>
    )
}

export default AddPresenter;
