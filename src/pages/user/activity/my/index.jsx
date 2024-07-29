import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import { doSignOut } from '../../../../firebase/auth'
import Header from "../../../../components/user/header";
import Footer from "../../../../components/user/footer";
import Sidebar from "../../../../components/user/sidebar";

const MyActivity = () => {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()
    

    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
        <Header />
          <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header border-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title"><b>My Activities</b></h3>
                                    {/* <a href="javascript:void(0);">View Report</a> */}
                                </div>
                                </div>
                                <div className="card-body table-responsive p-0" style={{height: 300}}>
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
                                        <tr>
                                            <td>1</td>
                                            <td>11-7-2014</td>
                                            <td>Grish</td>
                                            <td>Pitch-black Armor Enhancement Scroll</td>
                                            <td>14</td>
                                            <td>No</td>
                                            <td>Grisha, Weath</td>
                                            <td>0.8</td>
                                            <td>This Party is Awesome</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
            <Footer />
        </div>
      </div>
      );
    }
    
export default MyActivity