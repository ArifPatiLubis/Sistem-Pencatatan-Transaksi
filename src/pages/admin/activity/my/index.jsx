import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import { doSignOut } from '../../../../firebase/auth'
import { Button } from 'primereact/button';
import Header from "../../../../components/admin/header";
import Footer from "../../../../components/admin/footer";
import Sidebar from "../../../../components/admin/sidebar";
import TableMyPartyActivity from '../../tables/my-party-activity';

const MyActivity = () => {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()

    const [totalReceiveAmount, setTotalReceiveAmount] = useState(0);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2 }).format(amount);
    };

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
                        <div className="invoice p-3 mb-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3 className="card-title">
                                        <b>My Available Amount</b>
                                    </h3>
                                    <NavLink to="/admin/activities/party/add">
                                        <Button label="Withdraw" severity="help" icon="pi pi-money-bill" />
                                    </NavLink>
                                </div>
                                </div>
                            </div>
                            <div className="row invoice-info mt-2">
                                <div className="col-sm-4 invoice-col">
                                <address>
                                <strong>Crows Token</strong>
                                <br />
                                <h3 style={{marginTop: "10px", marginLeft:"15px"}}>{totalReceiveAmount}</h3>
                                </address>
                                </div>
                            </div>
                        </div>
                            <div className="card">
                                <div className="card-header border-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title"><b>My Activities</b></h3>
                                    {/* <a href="javascript:void(0);">View Report</a> */}
                                </div>
                                </div>
                                <TableMyPartyActivity setTotalReceiveAmount={setTotalReceiveAmount}></TableMyPartyActivity>
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