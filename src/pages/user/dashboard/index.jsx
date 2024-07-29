import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import { doSignOut } from '../../../firebase/auth'
import Header from "../../../components/user/header";
import Footer from "../../../components/user/footer";
import Sidebar from "../../../components/user/sidebar";
import Content from "../../../components/Content";

const Dashboard = () => {
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
                                    <h3 className="card-title">Online Store Visitors</h3>
                                    <a href="javascript:void(0);">View Report</a>
                                </div>
                                </div>
                                <div className="card-body">
                                <div className="d-flex">
                                    <p className="d-flex flex-column">
                                    <span className="text-bold text-lg">820</span>
                                    <span>Visitors Over Time</span>
                                    </p>
                                    <p className="ml-auto d-flex flex-column text-right">
                                    <span className="text-success">
                                        <i className="fas fa-arrow-up" /> 12.5%
                                    </span>
                                    <span className="text-muted">Since last week</span>
                                    </p>
                                </div>
                                {/* /.d-flex */}
                                <div className="position-relative mb-4">
                                    <canvas id="visitors-chart" height={200} />
                                </div>
                                <div className="d-flex flex-row justify-content-end">
                                    <span className="mr-2">
                                    <i className="fas fa-square text-primary" /> This Week
                                    </span>
                                    <span>
                                    <i className="fas fa-square text-gray" /> Last Week
                                    </span>
                                </div>
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
    
export default Dashboard