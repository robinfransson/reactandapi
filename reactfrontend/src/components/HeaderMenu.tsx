import * as React from 'react';
import { useAuth } from '../scripts/auth';
import style from '../scss/HeaderMenu.module.scss';
import { authContext } from './AuthContext';
import { Login } from './Login';
import { Modal } from './Modal';
import { ProfileMenu } from './ProfileMenu';

export const HeaderMenu = () => {
    const [visible, setVisible] = React.useState(false);
    const toggleVisible = () => {
        setVisible((old) => !old);
    };
    const { authorized } = React.useContext(authContext);
    React.useEffect(() => {
        console.log('(headermeny) authorized: ', authorized);
    }, [authorized]);

    React.useEffect(() => {
        console.log('authorized: ', authorized);
    }, [authorized]);

    return (
        <div className={style.HeaderMenu} id="headermenu">
            <div className={style['HeaderMenu-logo']}>Hej</div>
            {authorized ? (
                <>
                    <div className="" onClick={toggleVisible}>
                        Profile
                    </div>
                    {visible && (
                        <Modal toggle={toggleVisible}>
                            <ProfileMenu />
                        </Modal>
                    )}
                </>
            ) : (
                <>
                    <div className="" onClick={toggleVisible}>
                        Log in
                    </div>
                    {visible && (
                        <Modal toggle={toggleVisible}>
                            <Login />
                        </Modal>
                    )}
                </>
            )}
        </div>
    );
};
