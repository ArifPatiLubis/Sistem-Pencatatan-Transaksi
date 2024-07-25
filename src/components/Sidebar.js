import React, {} from "react";

function Sidebar() {
    return(
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">
                <nav className="mt-3">
                    <ul className="nav nav-pills nav-sidebar flex-column"   data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <a href="#" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                Dashboard
                                <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="nav-link">
                                <i className="nav-icon fas fa-th" />
                                <p>
                                Widgets
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;