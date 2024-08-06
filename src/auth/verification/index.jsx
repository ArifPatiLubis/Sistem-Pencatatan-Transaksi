import React, { useState } from 'react'
import { Navigate, Link, useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth'

const Verification = () => {

    
    return (
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                    <NavLink to={"/login"} className="h1"><b>Admin</b>LTE</NavLink>
                    </div>
                    <div className="card-body">
                    <p className="login-box-msg">Wait For Admin Verification</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verification