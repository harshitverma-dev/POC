
import React, { useState, useEffect, useContext, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { ProductContextData } from '../context/ContextData';
import { Badge } from 'primereact/badge';
// import { Chip } from 'primereact/chip';
import { userPresentersI } from '../interface/Presenters';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const SubAdminTable: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllSubAdminListDataByApi, storeAllSubAdminList } = context;
    // const navigate = useNavigate()
    // const [customers, setCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    // const [loading, setLoading] = useState<boolean>(false);
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
    const dt = useRef<DataTable<userPresentersI[] | []>>(null);
    const exportColumns = [
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'role', header: 'Role' },
        { field: 'metaData.contact_no', header: 'contact No' },
        { field: 'metaData.college', header: 'College' },
        { field: 'metaData.course', header: 'Course' },
        { field: 'metaData.stream', header: 'Stream' },
        { field: 'metaData.graduation_year', header: 'Graduation Year' },
        { field: 'metaData.location', header: 'Location' },
    ];
    const toast = useRef<Toast>(null)



    useEffect(() => {
        // getAllPresentersDataByApi();
        getAllSubAdminListDataByApi()
    }, []);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters = { ...filters };

        // @ts-ignore
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const exportCSV = (selectionOnly: any) => {
        dt.current?.exportCSV({ selectionOnly });
    };

    const saveAsExcelFile = (buffer: any, fileName: string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                const EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });
                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            // Prepare data with nested fields resolved
            const data = storeAllSubAdminList.map((row) =>
                exportColumns.reduce((acc: any, col) => {
                    const field = col.field as keyof typeof row;
                    if (typeof field === 'string' && field.includes('.')) {
                        // Handle nested fields (e.g., metaData.contact_no)
                        const keys = field.split('.'); // Split nested keys
                        acc[col.header] = keys.reduce((nestedAcc: any, key) => nestedAcc && nestedAcc[key], row) || '';
                    } else {
                        acc[col.header] = row[field] || '';
                    }
                    return acc;
                }, {})
            );

            // Create worksheet and workbook
            const worksheet = xlsx.utils.json_to_sheet(data);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };

            // Write workbook and save as Excel file
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'subadmin-table');
        });
    };


    const exportPdf = () => {
        import('jspdf').then((jsPDFModule) => {
            const jsPDF: any = jsPDFModule.default;
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF();
                const headers = [exportColumns.map((col) => col.header)];
                const data = storeAllSubAdminList.map((row) =>
                    exportColumns.map((col) => {
                        // Check if the field is nested (e.g., metaData.contact_no)
                        const field = col.field as keyof typeof row;
                        if (typeof field === 'string' && field.includes('.')) {
                            const keys = field.split('.'); // Split nested keys
                            return keys.reduce((acc: any, key) => acc && acc[key], row); // Access nested fields
                        }
                        return row[field];
                    })
                );
                doc.autoTable({
                    head: headers,
                    body: data,
                });
                doc.save('subadmin-table.pdf');
            });
        });
    };






    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h4 className="m-0">Sub Admin -</h4>
                <div className='flex items-center flex-wrap gap-2'>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText type='search' size='small' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search ..." />
                    </IconField>
                    <div className='flex items-center md:ml-2'>
                        <Button size='small' type="button" icon="pi pi-file" label='Export CSV' rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                        <Button size='small' className='ml-2' type="button" icon="pi pi-file-excel" label='Export Excel' severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                        {/* <Button size='small' className='ml-2' type="button" icon="pi pi-file-pdf" label='Download PDF' severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
                    </div>
                </div>

            </div>
        );
    };

    const roleTemplate = (rowData: any) => {
        return (
            <Badge value={rowData.role} />
        )
    };

    // const techExpertiesTemplate = (rowData: any) => {
    //     if (Array.isArray(rowData.techExpertise) && rowData.techExpertise.length > 0) {
    //         return (
    //             <div className="techExpertiesContainerForRow">
    //                 {rowData.techExpertise?.map((item: string, index: number) => (
    //                     <Chip key={index} label={item} className="techBadge text-[14px] mr-2" />
    //                 ))}
    //             </div>
    //         );
    //     }
    //     return <span>N/A</span>; // Fallback for empty or invalid data
    // };


    const header = renderHeader();
    // const header = 'kkkk'


    const deleteSinglePresenter = (id: any) => {
        console.log(id)
        axios.delete(`${import.meta.env.VITE_BASE_URL}/university-student/profile/v1/profile?deletionId=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`
            }
        }).then((response) => {
            console.log(response);
            getAllSubAdminListDataByApi();
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: 'Profile deleted !' });
        }).catch(err => {
            console.log(err)
        })
    }

    const actionTemplate = (items: any) => {
        // console.log('ddd', items._id),
        return <i className='pi pi-trash text-lg text-orange-600 cursor-pointer' onClick={() => deleteSinglePresenter(items._id)} />
    }

    return (
        <div className="card w-full">
            <DataTable ref={dt} value={storeAllSubAdminList} paginator showGridlines rows={4} dataKey="id" filters={filters} globalFilterFields={['name', 'email', 'role', 'metaData.contact_no', 'metaData.college', 'metaData.course', 'metaData.stream', 'metaData.graduation_year', 'metaData.location']} header={header} emptyMessage="No sub Admin found." className='text-center'>

                <Column className='text-[13px] md:text-[15px]' field="name" header="Name" filterField="name" style={{ minWidth: '7rem' }} />

                <Column className='text-[13px] md:text-[15px]' field="email" header="Email" filterField="email" style={{ minWidth: '7rem' }} />

                {/* <Column field='role' header="Role" filterField="role" body={roleTemplate} style={{ minWidth: '5rem'}} /> */}

                <Column className='text-[13px] md:text-[15px]' field='metaData.contact_no' header="Contact No" filterField="metaData.contact_no" dataType="date" style={{ minWidth: '8rem', maxWidth: '8rem' }} />

                <Column className='text-[13px] md:text-[15px]' field='metaData.college' header="College" filterField="metaData.college" style={{ minWidth: '10rem', maxWidth: '20rem' }} />

                <Column className='text-[13px] md:text-[15px]' field="metaData.course" header="Course" filterField="metaData.course" style={{ minWidth: '4rem' }} />
                <Column className='text-[13px] md:text-[15px]' field="metaData.stream" header="Stream" filterField="metaData.stream" style={{ minWidth: '4rem' }} />
                <Column className='text-[13px] md:text-[15px]' field="metaData.graduation_year" header="Graduation Year" filterField="metaData.graduation_year" style={{ minWidth: '5rem' }} />
                <Column className='text-[13px] md:text-[15px]' field="metaData.location" header="location" filterField="metaData.location" style={{ minWidth: '4rem' }} />


                {/* <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} /> */}

                {/* <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} /> */}
                <Column field="action" header="Action" bodyClassName="text-center" style={{ maxWidth: '5rem' }} body={actionTemplate} />
            </DataTable>
            <Toast ref={toast} />
        </div>
    );
}


export default SubAdminTable;
