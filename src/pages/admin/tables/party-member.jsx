import React, { useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database"
import { database } from "../../../firebase/firebase"

const TablePartyMember = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dataRef = ref(database, 'users'); 
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
                        <th>Member Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                        <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      );
    }
    
export default TablePartyMember