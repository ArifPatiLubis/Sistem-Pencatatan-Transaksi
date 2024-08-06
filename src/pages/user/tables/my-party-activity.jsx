import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { useAuth } from '../../../context/authContext';
import { database } from '../../../firebase/firebase';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const TableMyPartyActivity = ({ setTotalReceiveAmount }) => {
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (currentUser) {
            const userRef = ref(database, `users/${currentUser.uid}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            });
        }
    }, [currentUser]);

    useEffect(() => {
        if (userData && userData.username) {
            const dataRef = ref(database, 'raids_activity');
            onValue(dataRef, (snapshot) => {
                const data = snapshot.val();
                const dataList = [];
                let totalAmount = 0.0;
                for (let id in data) {
                    if (data[id].raidMembers && data[id].raidMembers.includes(userData.username)) {
                        dataList.push({ id, ...data[id] });
                        totalAmount += parseFloat(data[id].crowsReceive);
                    }
                }
                setData(dataList);
                setTotalReceiveAmount(totalAmount.toFixed(2));  // Set total receive amount with 2 decimal places
            });
        }
    }, [userData, setTotalReceiveAmount]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter((item) =>
        item.bossName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.raidMembers.join(', ').toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="card">
            <div className="card-header">
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-search"></i>
                    </span>
                    <InputText placeholder="Search..." value={searchText} onChange={handleSearchChange} />
                </div>
            </div>
            <div className="card-body">
                <DataTable value={filteredData} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} currentPageReportTemplate="{first} to {last} of {totalRecords}">
                    <Column field="timestamp" header="Date" sortable></Column>
                    <Column field="bossName" header="Boss" sortable></Column>
                    <Column field="itemName" header="Item" sortable></Column>
                    <Column field="crowsGet" header="Crows" sortable></Column>
                    <Column field="minted" header="Minted" sortable></Column>
                    <Column field="raidMembers" header="Party Member" body={(rowData) => rowData.raidMembers.join(', ')} sortable></Column>
                    <Column field="crowsReceive" header="Receive Amount" sortable></Column>
                    <Column field="description" header="Description" sortable></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default TableMyPartyActivity;
