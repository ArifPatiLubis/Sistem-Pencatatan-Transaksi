import React, { useEffect, useState } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Login from '../auth/login';
import Register from '../auth/register';
import AdminDashboard from '../pages/admin/dashboard';
import AdminMyActivity from '../pages/admin/activity/my';
import AdminPartyActivity from '../pages/admin/activity/party';
import AdminAddActivity from '../pages/admin/activity/add';
import AdminPartyMembers from '../pages/admin/party/member';
import AdminAddMember from '../pages/admin/party/add';

import UserDashboard from '../pages/user/dashboard';
import UserMyActivity from '../pages/user/activity/my';
import UserPartyActivity from '../pages/user/activity/party';
import UserProfil from '../pages/user/profil';

function AppRoutes() {
    const { userLoggedIn, userRole } = useAuth();

    const routesArray = [
        {
            path: "*",
            element: userLoggedIn ? (userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />) : <Login />,
        },
        {
            path: "/login",
            element: userLoggedIn ? (userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />) : <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/admin/dashboard",
            element: userLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/activities/party",
            element: userLoggedIn && userRole === 'admin' ? <AdminPartyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/activities/my",
            element: userLoggedIn && userRole === 'admin' ? <AdminMyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/activities/party/add",
            element: userLoggedIn && userRole === 'admin' ? <AdminAddActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/party/members",
            element: userLoggedIn && userRole === 'admin' ? <AdminPartyMembers /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/party/members/add",
            element: userLoggedIn && userRole === 'admin' ? <AdminAddMember /> : <Navigate to="/login" replace />,
        },
        {
          path: "/user/dashboard",
          element: userLoggedIn && userRole === 'user' ? <UserDashboard /> : <Navigate to="/login" replace />,
        },
        {
          path: "/user/activities/party",
          element: userLoggedIn && userRole === 'user' ? <UserPartyActivity /> : <Navigate to="/login" replace />,
        },
        {
          path: "/user/activities/my",
          element: userLoggedIn && userRole === 'user' ? <UserMyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/user/profil",
            element: userLoggedIn && userRole === 'user' ? <UserProfil /> : <Navigate to="/login" replace />,
        },
    ];

    return useRoutes(routesArray);
}

export default AppRoutes;
