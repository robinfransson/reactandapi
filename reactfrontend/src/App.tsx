import React, { ReactNode, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter,
    Navigate,
    Route,
    Router,
    Routes,
} from 'react-router-dom';
import { Layout } from './views/Layout';
import { Home } from './views/Home';
import { Register } from './views/Register';
import { API } from './scripts/api';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout></Layout>}>
                    <Route index element={<Home></Home>}></Route>
                    <Route
                        path="/register"
                        element={<Register></Register>}
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
