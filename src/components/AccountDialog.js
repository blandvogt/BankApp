/*
  Renders dialog box when account is clicked on. Allos for deposits, withdrawl, and account deletions.
*/

import React, { useState } from 'react';
import { Button, Typography, TextField } from '@material-ui/core';
import './styles/AccountDialog.css';
import PropTypes from 'prop-types';
import DialogComponent from './DialogComponent';

const AccountDialog = ({ open, onClose, data }) => {
  const [action, setAction] = useState('Options');
  const [amount, setAmount] = useState('');

  // Handles errors for text fields.
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Handle errors and error messages for setting amounts on deposit and withdraw.
  const handleSetAmount = e => {
    e.persist();
    setAmount(e.target.value);
    if (action === 'Deposit' && e.target.value > 10000) {
      setErrorMsg('Must be less than $10,000.');
      setError(true);
    } else if (action === 'Withdraw' && (data.balance - e.target.value) < 100) {
      setErrorMsg('Cannot have less than $100 in account.');
      setError(true);
    } else if (action === 'Withdraw' && (data.balance * 0.90 < e.target.value)) {
      setErrorMsg('Cannot withdraw over 90% of balance.');
      setError(true);
    } else {
      setError(false);
    }
  }

  // Handles submit button for withdraw, deposit, and delete. Handles back button on the options screen.
  const handleClose = () => {
    onClose({action, data, amount});
    setAction('Options');
    setAmount('');
  }

  // Handles back button on withdraw and deposit dialog.
  const handleBack = () => {
    setAction('Options');
    setAmount('');
    setError(false);
  }
  
  // JSX for init and options menu
  const options = () => ({
    title: data.name,
    content: <>
      <Button className='btn' onClick={() => setAction('Deposit')} variant='contained'>Deposit</Button>
      <Button className='btn' onClick={() => setAction('Withdraw')} variant='contained'>Withdraw</Button>
    </>,
    actions: <>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={() => setAction('DeleteAcc')} color='secondary'>Delete</Button>
    </>
  });

  // JSX for deletes
  const deleteAcc = () => ({
    title: `Are you sure you want to delete ${data.name} and withdraw all funds?`,
    content: <section style={{textAlign: 'center'}}>
      <Button onClick={() => setAction('Options')}>No</Button>
      <Button onClick={handleClose} color='secondary'>Yes</Button>
    </section>,
    actions: null
  });

  // JSX for deposits and withdraws
  const depositWithdraw = () => ({
    title: action,
    content: <>
      <TextField label='Amount' error={error} type='number' value={amount} onChange={e => handleSetAmount(e)} helperText={error ? errorMsg : ''} />
      <Typography variant='subtitle2'>Current Balance: {data.balance}</Typography>
      <br/>
    </>,
    actions: <>
      <Button onClick={handleBack}>Back</Button>
      <Button onClick={() => handleClose(data)} disabled={error || !amount} color='primary' variant='contained'>Submit</Button>
    </>
  });

  // Render appropriate JSX depending on selected action
  const type = () => {
    switch(action) {
      case 'Options': return options();
      case 'DeleteAcc': return deleteAcc();
      default: return depositWithdraw();
    }
  }

  // Render dialog depending on the action/type selected
  return <DialogComponent title={type().title} content={type().content} actions={type().actions} open={open}/>
}

// Type Checking
AccountDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    balance: PropTypes.number,
    userId: PropTypes.string
  }) 
}

export default AccountDialog;