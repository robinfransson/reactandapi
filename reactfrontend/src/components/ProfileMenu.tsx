import React, { useContext, useEffect } from 'react';
import { authContext } from './AuthContext';
import { API } from '../scripts/api';

export const ProfileMenu = () => {
    const { authorized, setToken } = useContext(authContext);

    const logClick = () => {
        setToken!(undefined);
        window.sessionStorage.setItem('token', '');
        console.log('clicked');
    };
    useEffect(() => {
        console.log('authorized: ', authorized);
    }, [authorized]);
    return (
        <div className="ProfileMenu">
            {'' + authorized}
            <div className="ProfileMenu-logout" onClick={logClick}>
                Log out
            </div>
            <button type="button" onClick={API.addRole}>
                Click me
            </button>
        </div>
    );
};
