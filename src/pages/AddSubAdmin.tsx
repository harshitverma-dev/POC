import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import React, { useContext, useRef, useState } from 'react'
import { ProductContextData } from '../context/ContextData';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const AddSubAdmin: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { inputfileValue,handleChangeExcelFile, isLoadingForExcel,uploadBulkUserApi } = context
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
    const toast = useRef<Toast>(null);

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
                subAdminContactNoError: !createSubAdminDetails.subAdminContactNo ? true : false,
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

        let url = `${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/user`;
        let payload = {
            name: createSubAdminDetails.subAdminName,
            email: createSubAdminDetails.subAdminEmailId,
            role: "SUBADMIN",
            // org: loginUserDetail?.role,
            org: createSubAdminDetails.subAdminCollege,
            metaData: {
                contact_no: createSubAdminDetails.subAdminContactNo,
                college: createSubAdminDetails.subAdminCollege,
                stream: createSubAdminDetails.subAdminStream,
                course: createSubAdminDetails.subAdminCourse,
                graduation_year: createSubAdminDetails.subAdminGraduationYear,
                location: createSubAdminDetails.subAdminLocation
            }
        }

        axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response) => {
            console.log(response);
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Sub Admin created !' });
            setisLoadingForCreateSubAdmin(false);
            setCreateSubAdminDetails({
                subAdminName: '',
                subAdminContactNo: '',
                subAdminEmailId: '',
                subAdminCollege: '',
                subAdminCourse: '',
                subAdminStream: '',
                subAdminGraduationYear: '',
                subAdminLocation: ''
            })
        }).catch((err) => {
            console.log(err)
            setisLoadingForCreateSubAdmin(false);
        })
    }


    return (
        <div className='w-full md:w-1/2 m-auto addSubAdminContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[24px] md:text-[28px] lg:text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Create Sub Admin</h3>
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
                <div className="flex flex-col justify-start items-start">
                    <Button loading={isLoadingForCreateSubAdmin} label="Submit" onClick={saveSubAdminProfile} />
                    <div className='mt-3 w-full border-top border-solid border-[#ddd]'>
                        <div className='mt-3'>Or Upload By Excel :-</div>
                        <div className='flex justify-center w-full items-center mt-2'>
                            <input ref={inputfileValue} onChange={handleChangeExcelFile} type="file" accept=".xlsx,.xls" className="block w-full mb-0 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                            <Button className='ml-3' disabled={isLoadingForExcel} icon={isLoadingForExcel ? 'pi pi-spin pi-spinner' : "pi pi-cloud-upload"} onClick={() => { uploadBulkUserApi('SUBADMIN') }} />
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    )
}

export default AddSubAdmin;
