import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import React, { useContext, useRef, useState } from 'react'
import { ProductContextData } from '../context/ContextData';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const AddStudent: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    // const { loginUserDetail } = context
    const [createStudentDetails, setCreateStudentDetails] = useState({
        StudentName: '',
        StudentContactNo: '',
        StudentEmailId: '',
        StudentCollege: '',
        StudentCourse: '',
        StudentStream: '',
        StudentGraduationYear: '',
        StudentLocation: ''
    })
    const [createStudentErrors, setCreateStudentErrors] = useState({
        StudentNameError: false,
        StudentContactNoError: false,
        StudentEmailIdError: false,
        StudentCollegeError: false,
        StudentCourseError: false,
        StudentStreamError: false,
        StudentGraduationYearError: false,
        StudentLocationError: false
    })
    const [isLoadingForCreateStudent, setisLoadingForCreateStudent] = useState(false);
    const toast = useRef<Toast>(null);

    const onChangeFun = (e: any) => {
        const { value, name } = e.target;
        setCreateStudentDetails({
            ...createStudentDetails,
            [name]: value
        })
    }

    const saveStudentProfile = () => {
        // console.log(createStudentDetails)
        setisLoadingForCreateStudent(true)
        if (!createStudentDetails.StudentName || !createStudentDetails.StudentContactNo || !createStudentDetails.StudentEmailId || !createStudentDetails.StudentCollege || !createStudentDetails.StudentCourse || !createStudentDetails.StudentStream || !createStudentDetails.StudentGraduationYear || !createStudentDetails.StudentLocation) {
            setCreateStudentErrors({
                StudentNameError: !createStudentDetails.StudentName ? true : false,
                StudentContactNoError: !createStudentDetails.StudentContactNo ? true : false,
                StudentEmailIdError: !createStudentDetails.StudentEmailId ? true : false,
                StudentCollegeError: !createStudentDetails.StudentCollege ? true : false,
                StudentCourseError: !createStudentDetails.StudentCourse ? true : false,
                StudentStreamError: !createStudentDetails.StudentStream ? true : false,
                StudentGraduationYearError: !createStudentDetails.StudentGraduationYear ? true : false,
                StudentLocationError: !createStudentDetails.StudentLocation ? true : false
            })
            setisLoadingForCreateStudent(false);
            return false
        }

        let url = `${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/user`;
        let payload = {
            name: createStudentDetails.StudentName,
            email: createStudentDetails.StudentEmailId,
            role: "STUDENT",
            // org: loginUserDetail?.role,
            org: createStudentDetails.StudentCollege,
            metaData: {
                contact_no: createStudentDetails.StudentContactNo,
                college: createStudentDetails.StudentCollege,
                stream: createStudentDetails.StudentStream,
                course: createStudentDetails.StudentCourse,
                graduation_year: createStudentDetails.StudentGraduationYear,
                location: createStudentDetails.StudentLocation
            }
        }

        axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            },
        }).then((response)=>{
            console.log(response);
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Student created !' });
            setisLoadingForCreateStudent(false);
            setCreateStudentDetails({
                StudentName: '',
                StudentContactNo: '',
                StudentEmailId: '',
                StudentCollege: '',
                StudentCourse: '',
                StudentStream: '',
                StudentGraduationYear: '',
                StudentLocation: ''
            })
        }).catch((err)=>{
            console.log(err)
            setisLoadingForCreateStudent(false);
        })
    }


    return (
        <div className='md:w-1/2 m-auto addStudentContainer rounded p-5'>
            <div className="card">
                <h3 className='text-[32px] mb-7 text-center border-b border-[#ddd] border-solid'>Create Student</h3>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentName" className="">Name:</label>
                    <InputText id="StudentName" type='text' value={createStudentDetails.StudentName} onChange={onChangeFun} name='StudentName' placeholder="Enter the name" className="mr-2 w-full" />
                    {(createStudentErrors.StudentNameError && !createStudentDetails.StudentName) && <Message severity="error" className='p-1' text="Name is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentContactNo" className="">Contact Number:</label>
                    <InputText id="StudentContactNo" type='number' value={createStudentDetails.StudentContactNo} onChange={onChangeFun} name='StudentContactNo' placeholder="Enter the contact number" className="mr-2 w-full" />
                    {(createStudentErrors.StudentContactNoError && !createStudentDetails.StudentContactNo) && <Message severity="error" className='p-1' text="Contact number is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentEmailId" className="">Email Id:</label>
                    <InputText id="StudentEmailId" type='email' value={createStudentDetails.StudentEmailId} onChange={onChangeFun} name='StudentEmailId' placeholder="Enter the email" className="mr-2 w-full" />
                    {(createStudentErrors.StudentEmailIdError && !createStudentDetails.StudentEmailId) && <Message severity="error" className='p-1' text="Email Id is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentCollege" className="">College:</label>
                    <InputText id="StudentCollege" type='text' value={createStudentDetails.StudentCollege} onChange={onChangeFun} name='StudentCollege' placeholder="Enter the college name" className="mr-2 w-full" />
                    {(createStudentErrors.StudentCollegeError && !createStudentDetails.StudentCollege) && <Message severity="error" className='p-1' text="College is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentCourse" className="">Course:</label>
                    <InputText id="StudentCourse" type='text' value={createStudentDetails.StudentCourse} onChange={onChangeFun} name='StudentCourse' placeholder="Enter the course" className="mr-2 w-full" />
                    {(createStudentErrors.StudentCourseError && !createStudentDetails.StudentCourse) && <Message severity="error" className='p-1' text="Course is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentStream" className="">Stream:</label>
                    <InputText id="StudentStream" type='text' value={createStudentDetails.StudentStream} onChange={onChangeFun} name='StudentStream' placeholder="Enter the stream" className="mr-2 w-full" />
                    {(createStudentErrors.StudentStreamError && !createStudentDetails.StudentStream) && <Message severity="error" className='p-1' text="Stream is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentGraduationYear" className="">Graduation Year:</label>
                    <InputText id="StudentGraduationYear" type='number' value={createStudentDetails.StudentGraduationYear} onChange={onChangeFun} name='StudentGraduationYear' placeholder="Enter the graduation year" className="mr-2 w-full" />
                    {(createStudentErrors.StudentGraduationYearError && !createStudentDetails.StudentGraduationYear) && <Message severity="error" className='p-1' text="Graduation year is required" />}
                </div>
                <div className="flex flex-wrap flex-col items-start justify-start mb-3 gap-2">
                    <label htmlFor="StudentLocation" className="">Location:</label>
                    <InputText id="StudentLocation" type='text' value={createStudentDetails.StudentLocation} onChange={onChangeFun} name='StudentLocation' placeholder="Enter the location" className="mr-2 w-full" />
                    {(createStudentErrors.StudentLocationError && !createStudentDetails.StudentLocation) && <Message severity="error" className='p-1' text="Location is required" />}
                </div>
                <Button loading={isLoadingForCreateStudent} label="Submit" onClick={saveStudentProfile} />
            </div>
            <Toast ref={toast} />
        </div>
    )
}

export default AddStudent;
