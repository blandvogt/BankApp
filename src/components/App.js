// Toggle between the Login Page and a User Page
import React, { useState } from 'react';
import UserPage from './UserPage';
import LoginPage from './LoginPage';

const App = () => {
    const [page, setPage] = useState({type: 'LoginPage', data: null});

    switch(page.type) {
        case 'LoginPage': return <LoginPage setPage={setPage}/>;
        case 'UserPage': return <UserPage setPage={setPage} user={page.data}/>;
        default: throw new Error(`Unexpected Page Type: ${page.type}`);
    }
}

export default App;