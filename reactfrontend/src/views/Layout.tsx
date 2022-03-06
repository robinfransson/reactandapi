import * as React from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderMenu } from '../components/HeaderMenu';
import mainStyle from '../scss/Shared.module.scss';
export const Layout = () => {
    return (
        <>
            <div
                className={mainStyle['Modal-container']}
                id="modal-container"
            ></div>
            <div
                className={mainStyle['Message-container']}
                id="message-container"
            ></div>
            <HeaderMenu />
            <div className={mainStyle['Page-main']}>
                <Outlet></Outlet>
            </div>
        </>
    );
};
