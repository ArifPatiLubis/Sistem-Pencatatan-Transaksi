import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database";
import { useAuth } from '../../../context/authContext';
import { database } from '../../../firebase/firebase';

const TableMyPartyActivity = ({ setTotalReceiveAmount }) => {
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);

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

    return (
        <div className="card-body table-responsive p-0" style={{ height: 400 }}>
            <table className="table table-head-fixed text-nowrap">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Boss</th>
                        <th>Item</th>
                        <th>Crows</th>
                        <th>Minted</th>
                        <th>Party Member</th>
                        <th>Receive Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.timestamp}</td>
                            <td>{item.bossName}</td>
                            <td>{item.itemName}</td>
                            <td>{item.crowsGet}</td>
                            <td>{item.minted}</td>
                            <td>{item.raidMembers.join(', ')}</td>
                            <td>{item.crowsReceive}</td>
                            <td>{item.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableMyPartyActivity;