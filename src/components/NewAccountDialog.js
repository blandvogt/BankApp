/*
    Renders dialog box for creation of new account for user.
*/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import DialogComponent from './DialogComponent';

const NewAccountDialog = ({ open, onClose, user }) => {
    const [input, setInput] = useState({name: '', balance: 100});
    const [hasError, setHasError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')

    // Control state for name and balance. Display error if balance is under 100 or over 10000.
    const handleInputChange = e => {
        e.persist();
        switch (e.target.id) {
            case 'accountNameInput': setInput(prev => ({name: e.target.value, balance: prev.balance}));
                break;
            case 'accountBalanceInput': setInput(prev => ({name: prev.name, balance: e.target.value}));
                break;
            default: throw new Error(`Unexpected input: ${e.target.id}`);
        }
    }

    // Close dialog box without creating account, and reset states.
    const handleCancelClick = () => {
        setInput({name: '', balance: 100});
        setHasError(false);
        onClose({action: null});
    }

    // Resets inputs, closes dialog box, and creates new account
    const handleCreateClick = () => {
        const newAccount = user.addAccount(input.name, input.balance);

        switch(newAccount) {
            case 'Success': onClose();
                setInput({name: '', balance: 100}); 
                break;
            default: setHasError(true);
                setErrorMsg(newAccount);
        }
    }

    // Content JSX
    const content = () => <>
        <TextField id='accountNameInput' label="Account Name" value={input.name} onChange={e => handleInputChange(e)}/>
        <TextField id='accountBalanceInput' error={hasError} helperText={hasError ? errorMsg : ''} type='number'
        label="Starting Balance" value={input.balance} onChange={e => handleInputChange(e)}/>
    </>;

    // Actions JSX
    const actions = () => <>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button variant='contained' color='primary' disabled={!input.name} onClick={handleCreateClick}>Create</Button>
    </>;

    return <DialogComponent title={'Add New Account'} content={content()} actions={actions()} open={open}/>
}

// Type Checking
NewAccountDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        id: PropTypes.string,
        accounts: PropTypes.object
    })
}

export default NewAccountDialog;