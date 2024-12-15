import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { techExpertiesList, userRoleList } from '../interface/ListOptions';
import { createUserDetailsI } from '../interface/userInterface';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';

const AddNewUser: React.FC = () => {
    const [createUserDetails, setCreateUserDetails] = useState<createUserDetailsI>({
        userName: '',
        userEmail: '',
        userOrg: '',
        userIntroduction: '',
        userRole: '',
        userTechExperties: []
    })
    const [createUserErrors, setCreateUserErrors] = useState({
        userNameError: false,
        userEmailError: false,
        userOrgError: false,
        userIntroductionError: false,
        userRoleError: false,
        userTechExpertiesError: false
    })
    const [isLoadingForCreateUser, setIsLoadingForCreateUser] = useState(false);

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setCreateUserDetails({
            ...createUserDetails,
            [name]: value
        })
    }
    // npm run start:dev
    const SaveUserProfile = () => {
        setIsLoadingForCreateUser(true);
        let correctFormatForTechExperties: string[] = [];
        createUserDetails.userTechExperties.forEach((items) => {
            correctFormatForTechExperties.push(items.id);
        });

        if (!createUserDetails.userName || !createUserDetails.userEmail || !createUserDetails.userOrg || !createUserDetails.userIntroduction || !createUserDetails.userRole || correctFormatForTechExperties.length == 0) {
            setCreateUserErrors({
                userNameError: !createUserDetails.userName ? true : false,
                userEmailError: !createUserDetails.userEmail ? true : false,
                userOrgError: !createUserDetails.userOrg ? true : false,
                userIntroductionError: !createUserDetails.userIntroduction ? true : false,
                userRoleError: !createUserDetails.userRole ? true : false,
                userTechExpertiesError: correctFormatForTechExperties.length == 0 ? true : false
            })
            setIsLoadingForCreateUser(false);
            return false;
            // if (!createUserDetails.userName) {
            //     setCreateUserErrors({
            //         ...createUserErrors,
            //         userNameError: true
            //     })
            //     console.log('userNameError')
            // }
            // if (!createUserDetails.userEmail) {
            //     setCreateUserErrors({
            //         ...createUserErrors,
            //         userEmailError: true
            //     })
            //     console.log('userEmailError')

            // } if (!createUserDetails.userOrg) {
            //     setCreateUserErrors({
            //         ...createUserErrors,
            //         userOrgError: true
            //     })
            // } if (!createUserDetails.userIntroduction) {
            //     setCreateUserErrors({
            //         ...createUserErrors,
            //         userIntroductionError: true
            //     })
            // } if (!createUserDetails.userRole) {
            //     setCreateUserErrors({
            //         ...createUserErrors,
            //         userRoleError: true
            //     })
            // } if (correctFormatForTechExperties.length == 0) {
            //     setCreateUserErrors({
            //         ...createUserErrors,
            //         userTechExpertiesError: true
            //     })
            // }
        }
        let url = 'http://localhost:3000/university-student/profile/v1/user';


        let payload = {
            name: createUserDetails.userName,
            email: createUserDetails.userEmail,
            org: createUserDetails.userOrg,
            introduction: createUserDetails.userIntroduction,
            role: createUserDetails.userRole?.id,
            techExpertise: correctFormatForTechExperties
        }
        // console.log(payload, 'kp')
        axios.post(url, payload, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJVUzMyNTIwOWRjN2EiLCJpc3MiOiJyYXZpbmRyYUBnbWFpbC5jb20iLCJuYW1lIjoicmF2aW5kcmEiLCJpYXQiOjE3MzM0Nzc5MDUsImV4cCI6MTczMzQ3ODgwNX0.CnHj9C0G_wEOjgAe1VlnnepYD0XlliP78DQFfC4mcs8'
            },
            // withCredentials: false
        }).then((res) => {
            console.log(res)
            setIsLoadingForCreateUser(false);
        }).catch(err => {
            console.log(err)
            setIsLoadingForCreateUser(false);
        })
    }
    return (
        <div className='md:w-1/2 m-auto addPresenterContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Create New User</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userName" className="">Name:</label>
                    <InputText invalid={createUserErrors.userNameError && !createUserDetails.userName} id="userName" value={createUserDetails.userName} name='userName' onChange={onChangeFun} placeholder="Enter the name" className="mr-2 w-full" />
                    {(createUserErrors.userNameError && !createUserDetails.userName) && <Message severity="error" className='p-1' text="Name is required" />}

                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userEmail" className="">Email:</label>
                    <InputText invalid={createUserErrors.userEmailError && !createUserDetails.userEmail} id="userEmail" value={createUserDetails.userEmail} name='userEmail' onChange={onChangeFun} placeholder="Enter the Email" className="mr-2 w-full" />
                    {(createUserErrors.userEmailError && !createUserDetails.userEmail) && <Message severity="error" className='p-1' text="Email is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userOrg" className="">Org:</label>
                    <InputText invalid={createUserErrors.userOrgError && !createUserDetails.userOrg} id="userOrg" value={createUserDetails.userOrg} name='userOrg' onChange={onChangeFun} placeholder="Enter org" className="mr-2 w-full" />
                    {(createUserErrors.userOrgError && !createUserDetails.userOrg) && <Message severity="error" className='p-1' text="Org is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userIntroduction" className="">Introduction:</label>
                    <InputTextarea invalid={createUserErrors.userIntroductionError && !createUserDetails.userIntroduction} autoResize value={createUserDetails.userIntroduction} name='userIntroduction' onChange={onChangeFun} placeholder='About..' rows={5} cols={30} className='mr-2 w-full' />
                    {(createUserErrors.userIntroductionError && !createUserDetails.userIntroduction) && <Message severity="error" className='p-1' text="Introduction is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userRole" className="">Select a Role:</label>
                    <Dropdown invalid={createUserErrors.userRoleError && !createUserDetails.userRole} options={userRoleList} name='userRole' value={createUserDetails.userRole} onChange={onChangeFun} optionLabel="label"
                        showClear placeholder="Choose one" className="w-full md:w-14rem" />
                    {(createUserErrors.userRoleError && !createUserDetails.userRole) && <Message severity="error" className='p-1' text="Role is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="userTechExperties" className="">Tech Experties:</label>
                    <MultiSelect invalid={createUserErrors.userTechExpertiesError && createUserDetails.userTechExperties.length == 0} options={techExpertiesList} name='userTechExperties' value={createUserDetails.userTechExperties} onChange={onChangeFun} optionLabel="label" placeholder='Select Experties' className="w-full sm:w-20rem" display="chip" />
                    {(createUserErrors.userTechExpertiesError && createUserDetails.userTechExperties.length == 0) && <Message severity="error" className='p-1' text="Tech Expertie is required" />}
                </div>
                <Button label="Submit" loading={isLoadingForCreateUser ? true : false} onClick={SaveUserProfile} />
            </div>
        </div>
    )
}

export default AddNewUser;
