/*
    Renders screen for user to login. Allows for creation of new users.
*/

import React, { useState } from 'react';
import DataTable from './DataTable';
import { User } from '../classes';
import { userStorage } from '../inMemoryStorage';

// Unique hash for User ID
import { v4 as uuidv4 } from 'uuid';

// Styles
import './styles/LoginPage.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Card, CardContent, CardActions, Accordion, AccordionSummary, AccordionDetails, 
    Button, TextField, Typography } from '@material-ui/core';

const LoginPage = ({ setPage }) => {
    // const [input, setInput] = useState({username: '', password: ''});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cardType, setCardType] = useState('login');

    // Handles form for creating new Users and for login attempts
    const handleFormSubmit = e => {
        e.preventDefault();
        if (cardType === 'create') {
            // If user does not already exist, create new User
            if (userStorage.get(`${username}/${password}`)) {
                alert('Account already exists!');
                return;
            }
            const newUser = new User(username, password, uuidv4());
            userStorage.set(`${username}/${password}`, newUser);
            handleTypeChange();
            setUsername('');
            setPassword('');
        } else {
            // Check if User exists
            const user = userStorage.get(`${username}/${password}`);
            if (user) {
                setPage({type: 'UserPage', data: user});
                handleTypeChange();
            } else alert('Not Found!');
        }
    }

    // Handle input for username and password and update state
    const handleInputChange = e => {
        e.persist();
        if (e.target.id === 'usernameInput') setUsername(e.target.value);
        else setPassword(e.target.value);
    }

    // Toggle between login state and create new user state
    const handleTypeChange = () => {
        setCardType(prev => prev === 'login' ? 'create' : 'login');
        setUsername('');
        setPassword('');
    }

    return (
        <>
            <Typography id='loginPageTitle' variant='h4'>Banking System Test</Typography>
            <section id='loginPageSection'>
                <Card id='loginCard'>
                    <form onSubmit={e => handleFormSubmit(e)}>
                        <CardContent id='loginCardContent'>
                            <TextField id='usernameInput' className='textField' label="Username"  
                                value={username} onChange={e => handleInputChange(e)}/>
                            <TextField id='passwordInput' className='textField' label="Password" 
                                value={password} onChange={e => handleInputChange(e)}/>
                        </CardContent>
                        <CardActions id='loginCardActions'>
                            <Button onClick={handleTypeChange}>{cardType === 'login' ? 'New Account' : 'Back'}</Button>
                            <Button variant='contained' color='primary' type='submit' disabled={!username || !password}>
                                {cardType === 'login' ? 'Login' : 'Create'}
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </section>

            {/* Left in for testing purposes only */}
            <Accordion id='loginPageAccordian'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <h4>Show All Users (DEV ONLY)</h4>
                </AccordionSummary>
                <AccordionDetails>
                    <DataTable rows={[...userStorage.values()]}/>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default LoginPage;