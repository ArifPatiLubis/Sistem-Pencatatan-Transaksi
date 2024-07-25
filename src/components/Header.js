import React, {} from "react";

function Header() {
    return(
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <div className="user-panel">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                            </div>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">Settings</span>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item">
                        <i className="fas fa-user mr-2" /> Profile
                        </a>
                        <div className="dropdown-divider" />
                        <a href="#" className="dropdown-item dropdown-footer" style={{color: 'red', fontWeight: 'bold'}}>Log Out</a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Header;