import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Login from '../auth/login';
import Register from '../auth/register';
import Verification from '../auth/verification';
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
    const { userLoggedIn, userRole, userVerified } = useAuth();

    const routesArray = [
        {
            path: "*",
            element: userLoggedIn ? (userVerified ? (userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />) : <Navigate to="/verification" replace />) : <Login />,
        },
        {
            path: "/login",
            element: userLoggedIn ? (userVerified ? (userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />) : <Navigate to="/verification" replace />) : <Login />,
        },
        {
            path: "/verification",
            element: userLoggedIn ? (userVerified ? (userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />) : <Verification />) : <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/admin/dashboard",
            element: userLoggedIn && userRole === 'admin' && userVerified ? <AdminDashboard /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/activities/party",
            element: userLoggedIn && userRole === 'admin' && userVerified ? <AdminPartyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/activities/my",
            element: userLoggedIn && userRole === 'admin' && userVerified ? <AdminMyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/activities/party/add",
            element: userLoggedIn && userRole === 'admin' && userVerified ? <AdminAddActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/party/members",
            element: userLoggedIn && userRole === 'admin' && userVerified ? <AdminPartyMembers /> : <Navigate to="/login" replace />,
        },
        {
            path: "/admin/party/members/add",
            element: userLoggedIn && userRole === 'admin' && userVerified ? <AdminAddMember /> : <Navigate to="/login" replace />,
        },
        {
            path: "/user/dashboard",
            element: userLoggedIn && userRole === 'user' && userVerified ? <UserDashboard /> : <Navigate to="/login" replace />,
        },
        {
            path: "/user/activities/party",
            element: userLoggedIn && userRole === 'user' && userVerified ? <UserPartyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/user/activities/my",
            element: userLoggedIn && userRole === 'user' && userVerified ? <UserMyActivity /> : <Navigate to="/login" replace />,
        },
        {
            path: "/user/profil",
            element: userLoggedIn && userRole === 'user' && userVerified ? <UserProfil /> : <Navigate to="/login" replace />,
        },
    ];

    return useRoutes(routesArray);
}

export default AppRoutes;
