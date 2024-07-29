import React, {} from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return(
        <aside className="main-sidebar sidebar-light-indigo">
            <h3 className="brand-link">
                <span className="brand-text font-weight-bold">SYNDICATES</span>
            </h3>

            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column text-sm" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item mt-1">
                            <NavLink to="/admin/dashboard" className="nav-link">
                            <i className="nav-icon fas fa-rocket mr-3" />
                            <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="nav-item has-treeview mt-2">
                            <NavLink to="/user/activities/party" className="nav-link">
                            <i className="nav-icon fas fa-chess-rook mr-3" />
                            <p>Party Activities</p>
                            </NavLink>
                        </li>
                        <li className="nav-item has-treeview mt-2">
                            <NavLink to="/user/activities/my" className="nav-link">
                            <i className="nav-icon fas fa-gamepad mr-3" />
                            <p>My Activities</p>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item has-treeview mt-2">
                            <NavLink to="/admin/party/members" className="nav-link">
                            <i className="nav-icon fas fa-chess-knight mr-3" />
                            <p>Party Members</p>
                            </NavLink>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;