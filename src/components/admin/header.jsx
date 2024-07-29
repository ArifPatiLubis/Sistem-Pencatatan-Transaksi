import React, {} from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { doSignOut } from '../../firebase/auth'

function Header() {
    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()

    return(
        <nav className="main-header navbar navbar-expand navbar-light bg-white">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                    <i className="fas fa-bars" /></a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* <li className="nav-item dropdown">
                <a className="nav-link"> {currentUser.displayName ? currentUser.displayName : currentUser.email}</a>
                </li> */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <div className="media">
                            <img src={currentUser.photoURL ?? "dist/img/user2-160x160.jpg"} className="img-circle mr-2" alt="User Image" style={{width: "25px", height: "25px"}}/>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">Settings</span>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                        <i className="fas fa-user mr-2" /> Profile
                        </a>
                        <div className="dropdown-divider" />
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className="dropdown-item dropdown-footer" style={{color: 'red', fontWeight: 'bold'}}>Log Out</button>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Header;