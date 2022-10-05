import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

/* components */
import Mainpage from './Component/Mainpage.js';
import AdminLogin from './Component/AdminLogin.js';
import AdminMainpage from './Component/AdminMainpage.js';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Mainpage />} />
                <Route path='/adm' element={<AdminLogin />} />
                <Route path='/admmain' element={<AdminMainpage />} />
            </Routes>
        </>
    );
}

export default App;
