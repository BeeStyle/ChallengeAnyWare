import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';

export default function Master({ user, LogOut }) {
    return (
        <>
            <NavBar user={user} LogOut={LogOut} />
            <div className='container'>
                <Outlet />
            </div>
        </>
    )
}