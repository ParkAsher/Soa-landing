import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* components */
import Mainpage from './Component/Mainpage.js';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Mainpage />} />
            </Routes>
        </>
    );
}

export default App;
