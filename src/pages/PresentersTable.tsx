
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
import { Chip } from 'primereact/chip';
import { userPresentersI } from '../interface/Presenters';

const defaultFilters: DataTableFilterMeta = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const PresenterTableList: React.FC = () => {
    const context = useContext(ProductContextData);
    if (!context) {
        throw new Error('it should not be null');
    }
    const { getAllPresentersDataByApi, storeAllPresenters } = context;
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
        { field: 'org', header: 'Organization' },
        { field: 'introduction', header: 'Introduction' },
        { field: 'techExpertise', header: 'Tech Expertise' },
    ];



    useEffect(() => {
        getAllPresentersDataByApi();
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

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(storeAllPresenters);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'preseenters-table');
        });
    };

    const saveAsExcelFile = (buffer: any, fileName: any) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDFModule) => {
            const jsPDF: any = jsPDFModule.default;
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF();
                const headers = [exportColumns.map((col) => col.header)];
                const data = storeAllPresenters.map((row) =>
                    exportColumns.map((col) => row[col.field as keyof typeof row])
                );
                doc.autoTable({
                    head: headers,
                    body: data,
                });
                doc.save('presenters-table.pdf');
            });
        });
    };






    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center">
                <h4 className="m-0">Presenters -</h4>
                <div className='flex items-center'>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText type='search' size='small' value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search ..." />
                    </IconField>
                    <div className='flex items-center ml-2'>
                        <Button size='small' type="button" icon="pi pi-file" label='Export CSV' rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                        <Button size='small' className='ml-2' type="button" icon="pi pi-file-excel" label='Export Excel' severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                        <Button size='small' className='ml-2' type="button" icon="pi pi-file-pdf" label='Download PDF' severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
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

    const techExpertiesTemplate = (rowData: any) => {
        if (Array.isArray(rowData.techExpertise) && rowData.techExpertise.length > 0) {
            return (
                <div className="techExpertiesContainerForRow">
                    {rowData.techExpertise?.map((item: string, index: number) => (
                        <Chip key={index} label={item} className="techBadge text-[14px] mr-2" />
                    ))}
                </div>
            );
        }
        return <span>N/A</span>; // Fallback for empty or invalid data
    };


    const header = renderHeader();
    // const header = 'kkkk'

    return (
        <div className="card w-full">
            <DataTable ref={dt} value={storeAllPresenters} paginator showGridlines rows={4} dataKey="id" filters={filters} globalFilterFields={['name', 'email', 'role', 'org', 'introduction']} header={header} emptyMessage="No presenters found." className='text-center'>

                <Column field="name" header="Name" filterField="name" style={{ minWidth: '7rem', maxWidth: '9rem' }} />

                <Column field="email" header="Email" filterField="email" style={{ minWidth: '7rem', maxWidth: '12rem' }} />

                <Column field='role' header="Role" filterField="role" body={roleTemplate} style={{ minWidth: '5rem', maxWidth: '5rem' }} />

                <Column field='org' header="Organization" filterField="org" dataType="date" style={{ minWidth: '8rem', maxWidth: '11rem' }} />

                <Column field='introduction' header="Introduction" filterField="introduction" style={{ minWidth: '10rem', maxWidth: '20rem' }} />

                <Column field="techExpertise" header="Tech Expertise" filterField="techExpertise" body={techExpertiesTemplate} style={{ minWidth: '12rem' }} />

                {/* <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} /> */}

                {/* <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} /> */}
            </DataTable>
        </div>
    );
}


export default PresenterTableList;
