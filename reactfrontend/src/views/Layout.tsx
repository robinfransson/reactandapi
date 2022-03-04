import * as React from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderMenu } from '../components/HeaderMenu';
export const Layout = () => {
    return (
        <>
            <div className="Message-container"></div>
            <HeaderMenu />
            <div className="Page-main">
                <Outlet></Outlet>
            </div>
        </>
    );
};
