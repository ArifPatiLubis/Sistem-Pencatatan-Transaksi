import React, { useEffect, useState } from 'react';
import { ref, onValue, update } from "firebase/database";
import { database } from "../../../firebase/firebase";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';

const TablePartyMember = () => {
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        role: '',
        verified: ''
    });

    useEffect(() => {
        const dataRef = ref(database, 'users');
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                console.error('No data available in Firebase');
                return;
            }
            const dataList = [];
            for (let id in data) {
                dataList.push({ id, ...data[id] });
            }
            setData(dataList);
            setTableData(dataList);
        }, (error) => {
            console.error("Error fetching data: ", error);
        });
    }, []);

    const openDialog = (rowData) => {
        setSelectedRow(rowData);
        setFormData({
            username: rowData.username,
            role: rowData.role,
            verified: rowData.verified
        });
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setSelectedRow(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRadioChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            verified: e.value
        }));
    };

    const saveChanges = () => {
        if (!selectedRow) {
            console.error('Selected row is not defined');
            return;
        }

        const userRef = ref(database, `users/${selectedRow.id}`);
        update(userRef, formData)
            .then(() => {
                const updatedData = tableData.map(row =>
                    row.id === selectedRow.id ? { ...row, ...formData } : row
                );
                setTableData(updatedData);
                closeDialog();
            })
            .catch((error) => {
                console.error("Error updating data: ", error);
            });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-pencil"
                className="p-button-primary"
                onClick={() => openDialog(rowData)}
            />
        );
    };

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="d-flex justify-content-between">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-search"></i>
                            </span>
                            <InputText
                                placeholder="Search..."
                                value={globalFilter}
                                onChange={(e) => setGlobalFilter(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <DataTable
                        value={tableData}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        globalFilter={globalFilter}
                        emptyMessage="No records found"
                    >
                        <Column field="username" header="Member Name" sortable></Column>
                        <Column field="role" header="Role" sortable></Column>
                        <Column
                            field="verified"
                            header="Verified"
                            body={(rowData) => rowData.verified ? 'True' : 'False'}
                            sortable
                        ></Column>
                        <Column
                            body={actionBodyTemplate}
                            header="Actions"
                        ></Column>
                    </DataTable>
                </div>
            </div>

            <Dialog 
                header="Edit Member" 
                visible={dialogVisible} 
                style={{ width: '90vw', maxWidth: '600px' }} 
                footer={
                    <div className="p-d-flex p-jc-end">
                        <Button label="Save" icon="pi pi-check" onClick={saveChanges} className="p-mr-2" />
                        <Button label="Cancel" icon="pi pi-times" onClick={closeDialog} className="p-button-secondary" />
                    </div>
                }
                onHide={closeDialog}
                className="p-fluid"
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="username">Member Name</label>
                        <InputText
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="role">Role</label>
                        <InputText
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="p-field">
                        <label>Verified</label>
                        <div className="p-d-flex p-ai-center">
                            <div className="p-field-radiobutton p-mr-3">
                                <RadioButton
                                    id="verifiedTrue"
                                    name="verified"
                                    value={true}
                                    checked={formData.verified === true}
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="verifiedTrue">True</label>
                            </div>
                            <div className="p-field-radiobutton">
                                <RadioButton
                                    id="verifiedFalse"
                                    name="verified"
                                    value={false}
                                    checked={formData.verified === false}
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="verifiedFalse">False</label>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default TablePartyMember;
