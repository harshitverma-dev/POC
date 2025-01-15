import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Message } from 'primereact/message';
import { InputTextarea } from 'primereact/inputtextarea';
// import { Dropdown } from 'primereact/dropdown';
import { techExpertiesList } from '../interface/ListOptions';
import { createPresenterDetailsI } from '../interface/presenterInterface';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { ProductContextData } from '../context/ContextData';

const EditProfile: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { loginUserDetail, setLoginUserDetail } = context
    const [updatePresenterDetails, setUpdatePresenterDetails] = useState<createPresenterDetailsI>({
        presenterName: '',
        presenterEmail: '',
        presenterContactNo: '',
        presenterOrg: '',
        presenterIntroduction: '',
        presenterIndustry: '',
        presenterSegment: '',
        // presenterRole: 'PROFESSOR'
        presenterTechExperties: []
    })
    const [updatePresenterErrors, setUpdatePresenterErrors] = useState({
        presenterNameError: false,
        presenterEmailError: false,
        presenterContactNoError: false,
        presenterOrgError: false,
        presenterIntroductionError: false,
        // presenterIndustryError: false,
        // PresenterSegmentError: false,
        // presenterRoleError: false,
        presenterTechExpertiesError: false
    })
    const [isLoadingForUpdatePresenter, setisLoadingForUpdatePresenter] = useState(false);
    const toast = useRef<Toast>(null)

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setUpdatePresenterDetails({
            ...updatePresenterDetails,
            [name]: value
        })
    }

    useEffect(() => {
        if (loginUserDetail) {
            setUpdatePresenterDetails({
                presenterName: loginUserDetail?.name,
                presenterEmail: loginUserDetail?.email,
                presenterContactNo: loginUserDetail?.metaData?.professor_contact_no,
                presenterOrg: loginUserDetail?.org,
                presenterIntroduction: loginUserDetail?.introduction,
                presenterIndustry: loginUserDetail?.industry,
                presenterSegment: loginUserDetail?.segment,
                // presenterRole: 'PROFESSOR'
                presenterTechExperties: loginUserDetail?.techExpertise.map((items: string) => {
                    return (
                        {
                            id: items,
                            label: items
                        }
                    )
                })
            })
        }
    }, [loginUserDetail])
    // npm run start:dev
    const UpdatePresenterProfile = () => {
        setisLoadingForUpdatePresenter(true);
        let correctFormatForTechExperties: string[] = [];
        updatePresenterDetails.presenterTechExperties.forEach((items) => {
            correctFormatForTechExperties.push(items.id);
        });

        if (!updatePresenterDetails.presenterName || !updatePresenterDetails.presenterEmail || !updatePresenterDetails.presenterContactNo || !updatePresenterDetails.presenterOrg || !updatePresenterDetails.presenterIntroduction || correctFormatForTechExperties.length == 0) {
            setUpdatePresenterErrors({
                presenterNameError: !updatePresenterDetails.presenterName ? true : false,
                presenterEmailError: !updatePresenterDetails.presenterEmail ? true : false,
                presenterContactNoError: !updatePresenterDetails.presenterContactNo ? true : false,
                presenterOrgError: !updatePresenterDetails.presenterOrg ? true : false,
                presenterIntroductionError: !updatePresenterDetails.presenterIntroduction ? true : false,
                // presenterRoleError: !updatePresenterDetails.presenterRole ? true : false,
                presenterTechExpertiesError: correctFormatForTechExperties.length == 0 ? true : false
            })
            setisLoadingForUpdatePresenter(false);
            return false;
        }
        let url = 'http://localhost:3000/university-student/profile/v1/update-profile';


        let payload = {
            // id: loginUserDetail._id,
            name: updatePresenterDetails.presenterName,
            email: updatePresenterDetails.presenterEmail,
            org: updatePresenterDetails.presenterOrg,
            introduction: updatePresenterDetails.presenterIntroduction,
            industry: updatePresenterDetails.presenterIndustry,
            segment: updatePresenterDetails.presenterSegment,
            role: 'PROFESSOR',
            techExpertise: correctFormatForTechExperties,
            metaData: {
                professor_contact_no: updatePresenterDetails.presenterContactNo
            }
        }
        // console.log(payload, 'kp')
        axios.put(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
            // withCredentials: false
        }).then((res) => {
            console.log(res)
            setLoginUserDetail(res.data)
            localStorage.setItem('userProfile', JSON.stringify(res.data))
            setisLoadingForUpdatePresenter(false);
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Profile updated !' });
            // setUpdatePresenterDetails({
            //     presenterName: '',
            //     presenterEmail: '',
            //     presenterOrg: '',
            //     presenterIntroduction: '',
            //     presenterIndustry: '',
            //     presenterSegment: '',
            //     presenterRole: {
            //         label: 'Professor',
            //         id: 'PROFESSOR'
            //     },
            //     presenterTechExperties: []
            // })
        }).catch(err => {
            console.log(err)
            setisLoadingForUpdatePresenter(false);
        })
    }
    return (
        <div className='md:w-1/2 m-auto addPresenterContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Update Profile</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterName" className="">Name:</label>
                    <InputText invalid={updatePresenterErrors.presenterNameError && !updatePresenterDetails.presenterName} id="presenterName" value={updatePresenterDetails.presenterName} name='presenterName' onChange={onChangeFun} placeholder="Enter the name" className="mr-2 w-full" />
                    {(updatePresenterErrors.presenterNameError && !updatePresenterDetails.presenterName) && <Message severity="error" className='p-1' text="Name is required" />}

                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterEmail" className="">Email:</label>
                    <InputText invalid={updatePresenterErrors.presenterEmailError && !updatePresenterDetails.presenterEmail} id="presenterEmail" value={updatePresenterDetails.presenterEmail} name='presenterEmail' onChange={onChangeFun} placeholder="Enter the Email" className="mr-2 w-full" />
                    {(updatePresenterErrors.presenterEmailError && !updatePresenterDetails.presenterEmail) && <Message severity="error" className='p-1' text="Email is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterContactNo" className="">Contact Number:</label>
                    <InputText invalid={updatePresenterErrors.presenterContactNoError && !updatePresenterDetails.presenterContactNo} id="presenterContactNo" value={updatePresenterDetails.presenterContactNo} name='presenterContactNo' onChange={onChangeFun} placeholder="Enter the contact number" className="mr-2 w-full" />
                    {(updatePresenterErrors.presenterContactNoError && !updatePresenterDetails.presenterContactNo) && <Message severity="error" className='p-1' text="Contact number is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterOrg" className="">Organization:</label>
                    <InputText invalid={updatePresenterErrors.presenterOrgError && !updatePresenterDetails.presenterOrg} id="presenterOrg" value={updatePresenterDetails.presenterOrg} name='presenterOrg' onChange={onChangeFun} placeholder="Enter org" className="mr-2 w-full" />
                    {(updatePresenterErrors.presenterOrgError && !updatePresenterDetails.presenterOrg) && <Message severity="error" className='p-1' text="Org is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterIntroduction" className="">Introduction:</label>
                    <InputTextarea invalid={updatePresenterErrors.presenterIntroductionError && !updatePresenterDetails.presenterIntroduction} autoResize value={updatePresenterDetails.presenterIntroduction} name='presenterIntroduction' onChange={onChangeFun} placeholder='About..' rows={5} cols={30} className='mr-2 w-full' />
                    {(updatePresenterErrors.presenterIntroductionError && !updatePresenterDetails.presenterIntroduction) && <Message severity="error" className='p-1' text="Introduction is required" />}
                </div>
                {/* <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterRole" className="">Select a Role:</label>
                    <Dropdown invalid={updatePresenterErrors.presenterRoleError && !updatePresenterDetails.presenterRole} options={userRoleList.filter((items) => items.id == 'PROFESSOR')} name='presenterRole' value={updatePresenterDetails.presenterRole} onChange={onChangeFun} optionLabel="label"
                        showClear placeholder="Choose one" className="w-full md:w-14rem" />
                    {(updatePresenterErrors.presenterRoleError && !updatePresenterDetails.presenterRole) && <Message severity="error" className='p-1' text="Role is required" />}
                </div> */}
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterIndustry" className="">Industry:</label>
                    <InputText id="presenterIndustry" value={updatePresenterDetails.presenterIndustry} name='presenterIndustry' onChange={onChangeFun} placeholder="Enter Industry" className="mr-2 w-full" />
                    {(updatePresenterErrors.presenterOrgError && !updatePresenterDetails.presenterOrg) && <Message severity="error" className='p-1' text="Org is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterSegment" className="">Segment:</label>
                    <InputText id="presenterSegment" value={updatePresenterDetails.presenterSegment} name='presenterSegment' onChange={onChangeFun} placeholder="Enter Segment" className="mr-2 w-full" />
                    {(updatePresenterErrors.presenterOrgError && !updatePresenterDetails.presenterOrg) && <Message severity="error" className='p-1' text="Org is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="presenterTechExperties" className="">Tech Experties:</label>
                    <MultiSelect invalid={updatePresenterErrors.presenterTechExpertiesError && updatePresenterDetails.presenterTechExperties.length == 0} options={techExpertiesList} name='presenterTechExperties' value={updatePresenterDetails.presenterTechExperties} onChange={onChangeFun} optionLabel="label" placeholder='Select Experties' className="w-full sm:w-20rem" display="chip" />
                    {(updatePresenterErrors.presenterTechExpertiesError && updatePresenterDetails.presenterTechExperties.length == 0) && <Message severity="error" className='p-1' text="Tech Expertie is required" />}
                </div>
                <Button label="Submit" loading={isLoadingForUpdatePresenter ? true : false} onClick={UpdatePresenterProfile} />
            </div>
            <Toast ref={toast} />
        </div>
    )
}

export default EditProfile;

