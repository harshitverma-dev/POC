import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { techExpertiesList, userRoleList } from '../interface/ListOptions';
import { createPresenterDetailsI } from '../interface/presenterInterface';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';

const AddNewPresenter: React.FC = () => {
    const [createPresenterDetails, setCreatePresenterDetails] = useState<createPresenterDetailsI>({
        presenterName: '',
        presenterEmail: '',
        presenterOrg: '',
        presenterIntroduction: '',
        presenterRole: {
            label: 'Professor',
            id: 'PROFESSOR'
        },
        presenterTechExperties: []
    })
    const [createPresenterErrors, setCreatePresenterErrors] = useState({
        presenterNameError: false,
        presenterEmailError: false,
        presenterOrgError: false,
        presenterIntroductionError: false,
        presenterRoleError: false,
        presenterTechExpertiesError: false
    })
    const [isLoadingForCreatePresenter, setisLoadingForCreatePresenter] = useState(false);

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setCreatePresenterDetails({
            ...createPresenterDetails,
            [name]: value
        })
    }
    // npm run start:dev
    const SavePresenterProfile = () => {
        setisLoadingForCreatePresenter(true);
        let correctFormatForTechExperties: string[] = [];
        createPresenterDetails.presenterTechExperties.forEach((items) => {
            correctFormatForTechExperties.push(items.id);
        });

        if (!createPresenterDetails.presenterName || !createPresenterDetails.presenterEmail || !createPresenterDetails.presenterOrg || !createPresenterDetails.presenterIntroduction || !createPresenterDetails.presenterRole || correctFormatForTechExperties.length == 0) {
            setCreatePresenterErrors({
                presenterNameError: !createPresenterDetails.presenterName ? true : false,
                presenterEmailError: !createPresenterDetails.presenterEmail ? true : false,
                presenterOrgError: !createPresenterDetails.presenterOrg ? true : false,
                presenterIntroductionError: !createPresenterDetails.presenterIntroduction ? true : false,
                presenterRoleError: !createPresenterDetails.presenterRole ? true : false,
                presenterTechExpertiesError: correctFormatForTechExperties.length == 0 ? true : false
            })
            setisLoadingForCreatePresenter(false);
            return false;
        }
        let url = 'http://localhost:3000/university-student/profile/v1/user';


        let payload = {
            name: createPresenterDetails.presenterName,
            email: createPresenterDetails.presenterEmail,
            org: createPresenterDetails.presenterOrg,
            introduction: createPresenterDetails.presenterIntroduction,
            role: createPresenterDetails.presenterRole?.id,
            techExpertise: correctFormatForTechExperties
        }
        // console.log(payload, 'kp')
        axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
            // withCredentials: false
        }).then((res) => {
            console.log(res)
            setisLoadingForCreatePresenter(false);
        }).catch(err => {
            console.log(err)
            setisLoadingForCreatePresenter(false);
        })
    }
    return (
        <div className='md:w-1/2 m-auto addPresenterContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Add New Presenter</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterName" className="">Name:</label>
                    <InputText invalid={createPresenterErrors.presenterNameError && !createPresenterDetails.presenterName} id="presenterName" value={createPresenterDetails.presenterName} name='presenterName' onChange={onChangeFun} placeholder="Enter the name" className="mr-2 w-full" />
                    {(createPresenterErrors.presenterNameError && !createPresenterDetails.presenterName) && <Message severity="error" className='p-1' text="Name is required" />}

                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterEmail" className="">Email:</label>
                    <InputText invalid={createPresenterErrors.presenterEmailError && !createPresenterDetails.presenterEmail} id="presenterEmail" value={createPresenterDetails.presenterEmail} name='presenterEmail' onChange={onChangeFun} placeholder="Enter the Email" className="mr-2 w-full" />
                    {(createPresenterErrors.presenterEmailError && !createPresenterDetails.presenterEmail) && <Message severity="error" className='p-1' text="Email is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterOrg" className="">Organization:</label>
                    <InputText invalid={createPresenterErrors.presenterOrgError && !createPresenterDetails.presenterOrg} id="presenterOrg" value={createPresenterDetails.presenterOrg} name='presenterOrg' onChange={onChangeFun} placeholder="Enter org" className="mr-2 w-full" />
                    {(createPresenterErrors.presenterOrgError && !createPresenterDetails.presenterOrg) && <Message severity="error" className='p-1' text="Org is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterIntroduction" className="">Introduction:</label>
                    <InputTextarea invalid={createPresenterErrors.presenterIntroductionError && !createPresenterDetails.presenterIntroduction} autoResize value={createPresenterDetails.presenterIntroduction} name='presenterIntroduction' onChange={onChangeFun} placeholder='About..' rows={5} cols={30} className='mr-2 w-full' />
                    {(createPresenterErrors.presenterIntroductionError && !createPresenterDetails.presenterIntroduction) && <Message severity="error" className='p-1' text="Introduction is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterRole" className="">Select a Role:</label>
                    <Dropdown invalid={createPresenterErrors.presenterRoleError && !createPresenterDetails.presenterRole} options={userRoleList.filter((items) => items.id == 'PROFESSOR')} name='presenterRole' value={createPresenterDetails.presenterRole} onChange={onChangeFun} optionLabel="label"
                        showClear placeholder="Choose one" className="w-full md:w-14rem" />
                    {(createPresenterErrors.presenterRoleError && !createPresenterDetails.presenterRole) && <Message severity="error" className='p-1' text="Role is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterTechExperties" className="">Tech Experties:</label>
                    <MultiSelect invalid={createPresenterErrors.presenterTechExpertiesError && createPresenterDetails.presenterTechExperties.length == 0} options={techExpertiesList} name='presenterTechExperties' value={createPresenterDetails.presenterTechExperties} onChange={onChangeFun} optionLabel="label" placeholder='Select Experties' className="w-full sm:w-20rem" display="chip" />
                    {(createPresenterErrors.presenterTechExpertiesError && createPresenterDetails.presenterTechExperties.length == 0) && <Message severity="error" className='p-1' text="Tech Expertie is required" />}
                </div>
                <Button label="Submit" loading={isLoadingForCreatePresenter ? true : false} onClick={SavePresenterProfile} />
            </div>
        </div>
    )
}

export default AddNewPresenter;
