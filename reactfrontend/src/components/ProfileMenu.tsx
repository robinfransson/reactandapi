import React, { useEffect } from 'react';
import { API } from '../scripts/api';
import { useAuth } from '../scripts/auth';

export const ProfileMenu: React.FC<{}> = () => {
    const { setToken } = useAuth();

    const logClick = () => {
        setToken!('');
        window.sessionStorage.setItem('token', '');
        console.log('clicked');
    };
    return (
        <>
            <div className="ProfileMenu">
                <div className="ProfileMenu-logout" onClick={logClick}>
                    Log out
                </div>
                <button type="button" onClick={API.addRole}>
                    Click me
                </button>
            </div>
        </>
    );
};
