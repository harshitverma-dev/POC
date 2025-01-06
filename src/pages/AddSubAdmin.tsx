import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import React, { useState } from 'react'

const AddSubAdmin: React.FC = () => {
    const [createSubAdminDetails, setCreateSubAdminDetails] = useState({
        subAdminName: '',
        subAdminContactNo: '',
        subAdminEmailId: '',
        subAdminCollege: '',
        subAdminCourse: '',
        subAdminStream: '',
        subAdminGraduationYear: '',
        subAdminLocation: ''
    })
    const [createSubAdminErrors, setCreateSubAdminErrors] = useState({
        subAdminNameError: false,
        subAdminContactNoError: false,
        subAdminEmailIdError: false,
        subAdminCollegeError: false,
        subAdminCourseError: false,
        subAdminStreamError: false,
        subAdminGraduationYearError: false,
        subAdminLocationError: false
    })
    const [isLoadingForCreateSubAdmin, setisLoadingForCreateSubAdmin] = useState(false);

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setCreateSubAdminDetails({
            ...createSubAdminDetails,
            [name]: value
        })
    }

    const saveSubAdminProfile = () => {
        // console.log(createSubAdminDetails)
        setisLoadingForCreateSubAdmin(true)
        if (!createSubAdminDetails.subAdminName || !createSubAdminDetails.subAdminContactNo || !createSubAdminDetails.subAdminEmailId || !createSubAdminDetails.subAdminCollege || !createSubAdminDetails.subAdminCourse || !createSubAdminDetails.subAdminStream || !createSubAdminDetails.subAdminGraduationYear || !createSubAdminDetails.subAdminLocation) {
            setCreateSubAdminErrors({
                subAdminNameError: !createSubAdminDetails.subAdminName ? true : false,
                subAdminContactNoError: !createSubAdminDetails.subAdminContactNo ? true: false,
                subAdminEmailIdError: !createSubAdminDetails.subAdminEmailId ? true : false,
                subAdminCollegeError: !createSubAdminDetails.subAdminCollege ? true : false,
                subAdminCourseError: !createSubAdminDetails.subAdminCourse ? true : false,
                subAdminStreamError: !createSubAdminDetails.subAdminStream ? true : false,
                subAdminGraduationYearError: !createSubAdminDetails.subAdminGraduationYear ? true : false,
                subAdminLocationError: !createSubAdminDetails.subAdminLocation ? true : false
            })
            setisLoadingForCreateSubAdmin(false);
            return false
        }

        // let url = "",
        // let payload = {

        // }
    }


    return (
        <div className='md:w-1/2 m-auto addSubAdminContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Create Sub Admin</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminName" className="">Name:</label>
                    <InputText id="subAdminName" type='text' value={createSubAdminDetails.subAdminName} onChange={onChangeFun} name='subAdminName' placeholder="Enter the name" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminNameError && !createSubAdminDetails.subAdminName) && <Message severity="error" className='p-1' text="Name is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminContactNo" className="">Contact Number:</label>
                    <InputText id="subAdminContactNo" type='number' value={createSubAdminDetails.subAdminContactNo} onChange={onChangeFun} name='subAdminContactNo' placeholder="Enter the contact number" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminContactNoError && !createSubAdminDetails.subAdminContactNo) && <Message severity="error" className='p-1' text="Contact number is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminEmailId" className="">Email Id:</label>
                    <InputText id="subAdminEmailId" type='email' value={createSubAdminDetails.subAdminEmailId} onChange={onChangeFun} name='subAdminEmailId' placeholder="Enter the email" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminEmailIdError && !createSubAdminDetails.subAdminEmailId) && <Message severity="error" className='p-1' text="Email Id is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminCollege" className="">College:</label>
                    <InputText id="subAdminCollege" type='text' value={createSubAdminDetails.subAdminCollege} onChange={onChangeFun} name='subAdminCollege' placeholder="Enter the college name" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminCollegeError && !createSubAdminDetails.subAdminCollege) && <Message severity="error" className='p-1' text="College is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminCourse" className="">Course:</label>
                    <InputText id="subAdminCourse" type='text' value={createSubAdminDetails.subAdminCourse} onChange={onChangeFun} name='subAdminCourse' placeholder="Enter the course" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminCourseError && !createSubAdminDetails.subAdminCourse) && <Message severity="error" className='p-1' text="Course is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminStream" className="">Stream:</label>
                    <InputText id="subAdminStream" type='text' value={createSubAdminDetails.subAdminStream} onChange={onChangeFun} name='subAdminStream' placeholder="Enter the stream" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminStreamError && !createSubAdminDetails.subAdminStream) && <Message severity="error" className='p-1' text="Stream is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminGraduationYear" className="">Graduation Year:</label>
                    <InputText id="subAdminGraduationYear" type='number' value={createSubAdminDetails.subAdminGraduationYear} onChange={onChangeFun} name='subAdminGraduationYear' placeholder="Enter the graduation year" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminGraduationYearError && !createSubAdminDetails.subAdminGraduationYear) && <Message severity="error" className='p-1' text="Graduation year is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="subAdminLocation" className="">Location:</label>
                    <InputText id="subAdminLocation" type='text' value={createSubAdminDetails.subAdminLocation} onChange={onChangeFun} name='subAdminLocation' placeholder="Enter the location" className="mr-2 w-full" />
                    {(createSubAdminErrors.subAdminLocationError && !createSubAdminDetails.subAdminLocation) && <Message severity="error" className='p-1' text="Location is required" />}
                </div>
                <Button label="Submit" onClick={saveSubAdminProfile} />
            </div>
        </div>
    )
}

export default AddSubAdmin;
