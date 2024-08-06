import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ref, onValue } from "firebase/database";
import { database } from "../../../firebase/firebase";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TablePartyActivity = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const dataRef = ref(database, 'raids_activity'); 
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            const dataList = [];
            for (let id in data) {
                dataList.push({ id, ...data[id] });
            }
            setData(dataList);
        });
    }, []);

    const exportToExcel = () => {
        const processedData = data.map(item => {
            const { id, ...rest } = item; // Remove 'id'
            return {
                ...rest,
                raidMembers: item.raidMembers.join(', ')
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(processedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Party Activity");

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'party_activity.xlsx');
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter(item => 
        item.timestamp.toLowerCase().includes(searchText.toLowerCase()) ||
        item.bossName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.crowsGet.toString().includes(searchText) ||
        item.minted.toString().includes(searchText) ||
        item.raidMembers.join(', ').toLowerCase().includes(searchText.toLowerCase()) ||
        item.crowsReceive.toString().includes(searchText) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="card">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                <NavLink to="/admin/activities/party/add" width="400px">
                    <Button label="Add Activity" severity="help"  icon="pi pi-plus-circle"/>
                    </NavLink>
                    <InputText 
                            type="text" 
                            placeholder="Search..." 
                            value={searchText} 
                            onChange={handleSearchChange} 
                            className="p-inputtext p-component"
                            style={{ marginBottom: '1rem' }}
                    />
                </div>
            </div>
            <div className="card-body table-responsive p-0">
                <DataTable
                    value={filteredData}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorLeft={<Button label="Download Excel" icon="pi pi-file-excel" onClick={exportToExcel} />}
                    paginatorRight={<span></span>}
                >
                    <Column field="timestamp" header="Date" style={{ width: '12.5%' }} sortable></Column>
                    <Column field="bossName" header="Boss" style={{ width: '12.5%' }} sortable></Column>
                    <Column field="itemName" header="Item" style={{ width: '12.5%' }} sortable></Column>
                    <Column field="crowsGet" header="Crows" style={{ width: '12.5%' }} sortable></Column>
                    <Column field="minted" header="Minted" style={{ width: '12.5%' }} sortable></Column>
                    <Column field="raidMembers" header="Party Member" style={{ width: '12.5%' }} body={(rowData) => rowData.raidMembers.join(', ')} sortable></Column>
                    <Column field="crowsReceive" header="Receive Amount" style={{ width: '12.5%' }} sortable></Column>
                    <Column field="description" header="Description" style={{ width: '12.5%' }} sortable></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default TablePartyActivity;