import React, { useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database"
import { database } from "../../../firebase/firebase"

const TablePartyActivity = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataRef = ref(database, 'raids_activity'); 
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          console.log(snapshot.val());
          const dataList = [];
          for (let id in data) {
            dataList.push({ id, ...data[id] });
          }
          setData(dataList);
          console.log(dataList);
        });
      }, []);

    return (
       <div className="card-body table-responsive p-0" style={{height: 400}}>
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
    
export default TablePartyActivity