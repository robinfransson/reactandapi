import * as React from 'react';
import { useAuth } from '../scripts/auth';
import style from '../scss/HeaderMenu.module.scss';
import { Login } from './Login';
import { ProfileMenu } from './ProfileMenu';

export const HeaderMenu = () => {
    const { authorized } = useAuth();
    const [ref, setRef] = React.useState<HTMLDivElement | null>();
    const [menuRef, setMenuRef] = React.useState<HTMLDivElement | null>();
    const [ready, setReady] = React.useState(false);
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        console.log('adding event');
        document.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('clicked');
            if (!menuRef?.contains(e.target as Element) && visible) {
                setVisible((old) => !old);
            }
        });
    }, [ready]);

    React.useEffect(() => {
        if (ref && menuRef) {
            setReady(true);
            console.log('ready:', ready);
        }
    }, [ref, menuRef]);

    return (
        <div className={style.HeaderMenu} ref={(ref) => setMenuRef(ref)}>
            <div className={style['HeaderMenu-logo']}>Hej</div>
            <div
                className={
                    visible
                        ? style['HeaderMenu-modal-active']
                        : style['HeaderMenu-modal']
                }
                ref={(ref) => setRef(ref)}
            >
                {authorized && <ProfileMenu />}
                {!authorized && <Login />}
            </div>
        </div>
    );
};
