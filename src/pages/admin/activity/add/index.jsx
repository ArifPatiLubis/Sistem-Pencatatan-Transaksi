import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/authContext'
import Header from "../../../../components/admin/header";
import Footer from "../../../../components/admin/footer";
import Sidebar from "../../../../components/admin/sidebar";
import { Button } from 'primereact/button';
import FormInputRaid from '../../forms/form-input-raid-info';

const AddActivity = () => {
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
                                    <h3 className="card-title"><b>Add Party Activities</b></h3>
                                </div>
                                </div>
                                <FormInputRaid></FormInputRaid>
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
    
export default AddActivity