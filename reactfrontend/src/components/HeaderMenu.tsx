import * as React from 'react';
import { Component } from 'react';
import { useAuth } from '../scripts/auth';
import '../scss/HeaderMenu.scss';
import { Login } from './Login';
import { authContext } from '../components/AuthContext';
import { ProfileMenu } from './ProfileMenu';

export const HeaderMenu = () => {
    const { authorized } = React.useContext(authContext);
    const [visible, setVisible] = React.useState(false);
    let element: HTMLDivElement | null = null;
    return (
        <div className="HeaderMenu">
            <div className="HeaderMenu-logo">Hej</div>
            {authorized ? (
                <>
                    <div
                        ref={(ref) => (element = ref)}
                        className="HeaderMenu-login"
                        onClick={(e) => {
                            if (element === e.target) setVisible((x) => !x);
                        }}
                    >
                        Profile
                    </div>
                    <div className={visible ? 'Login-active' : 'Login'}>
                        <ProfileMenu></ProfileMenu>
                    </div>
                </>
            ) : (
                <>
                    <div
                        ref={(ref) => (element = ref)}
                        className="HeaderMenu-login"
                        onClick={(e) => {
                            if (element === e.target) setVisible((x) => !x);
                        }}
                    >
                        Log in
                    </div>

                    <div className={visible ? 'Login-active' : 'Login'}>
                        <Login></Login>
                    </div>
                </>
            )}
        </div>
    );
};
