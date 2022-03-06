import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ModalOptions } from '../scripts/interfaces/interfaces';
import modal from '../scss/Modal.module.scss';

export const Modal: React.FC<ModalOptions> = ({ children, toggle }) => {
    const [ref, setRef] = React.useState<HTMLDivElement | null>();

    React.useEffect(() => {
        if (ref) {
            console.log('adding event');
            ref.addEventListener('click', (e) => {
                const target = e.target as Element;
                const shouldClose = ref == target;
                if (shouldClose) {
                    toggle();
                }
            });
        }
    }, [ref]);

    return ReactDOM.createPortal(
        <div className={modal.Modal} ref={setRef}>
            <div className={modal['Modal-content']}>{children}</div>
        </div>,
        document.querySelector('[id="modal-container"]')!
    );
};
