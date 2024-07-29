import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import Header from "../../../../components/admin/header"
import Footer from "../../../../components/admin/footer"
import Sidebar from "../../../../components/admin/sidebar"
import TablePartyActivity from '../../tables/party-activity'

const PartyActivity = () => {
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
                                    <h3 className="card-title"><b>Party Activities</b></h3>
                                    <NavLink to="/admin/activities/party/add" className="btn btn-secondary" width="400px"><i class="fas fa-plus-circle mr-3"></i>Add</NavLink>
                                </div>
                                </div>
                                <TablePartyActivity></TablePartyActivity>
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
    
export default PartyActivity