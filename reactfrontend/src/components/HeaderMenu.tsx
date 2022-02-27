import * as React from 'react';
import { Component } from 'react';
import { useAuth } from '../scripts/auth';
import '../scss/HeaderMenu.scss';
import { Login } from '../views/Register';
interface RefObject<T> {
    readonly current: T | null;
}
export const HeaderMenu = () => {
    const { authed } = useAuth();
    const [visible, setVisible] = React.useState(false);
    let element: HTMLDivElement | null = null;
    return (
        <div className="HeaderMenu">
            <div className="HeaderMenu-logo">Hej</div>
            {authed ? (
                <div className="HeaderMenu-profile">Profil</div>
            ) : (
                <div
                    ref={(ref) => (element = ref)}
                    className="HeaderMenu-login"
                    onClick={(e) => {
                        if (element === e.target) setVisible((x) => !x);
                    }}
                >
                    Logga in
                    <div className={visible ? 'Login-active' : 'Login'}>
                        <Login></Login>
                    </div>
                </div>
            )}
        </div>
    );
};
