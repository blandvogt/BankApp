/*
  Renders User Page. Allows user to create new accounts. Allows user to delete, withdraw from,
  and deposit into accounts.
*/

import React, { useState } from 'react';
import SelectionCard from './SelectionCard';
import { Button } from '@material-ui/core';
import './styles/UserPage.css';
import NewAccountDialog from './NewAccountDialog';
import AccountDialog from './AccountDialog';
import PropTypes from 'prop-types';

const UserPage = ({ setPage, user }) => {
  // Status of dialog boxes.
  const [newAccountOpen, setNewAccountOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Current account being looked at.
  const [accountInfo, setAccountInfo] = useState({});

  // Handle click on account. Open account in dialog box.
  const handleAccountClick = e => {
      setAccountInfo(e);
      setAccountOpen(true);
  }

  // Handle account dialog close
  const handleAccountClose = input => {
    setAccountOpen(false);
    switch (input.action) {
      case 'DeleteAcc': user.deleteAccount(input.data.id)
        break;
      case 'Deposit': user.accounts.get(input.data.id).deposit(parseInt(input.amount));
        break;
      case 'Withdraw': user.accounts.get(input.data.id).withdraw(parseInt(input.amount));
        break;
      default: return;
    }
  }

  return (
    <>
      <header>
        <Button size='small' onClick={() => setPage({type: 'LoginPage', data: {}})}>Log Out</Button>
        <h1 id='welcomeHeader'>Welcome {user.username}!</h1>
        <Button size='small' onClick={() => setNewAccountOpen(prev => !prev)}>Add New</Button>
      </header>
      <div id='grid'>
        {/* Display all user accounts */}
        {[...user.accounts.keys()].map(k => <SelectionCard key={k} data={user.accounts.get(k)} handleClick={handleAccountClick}/>)}
      </div>
      <AccountDialog open={accountOpen} onClose={e => handleAccountClose(e)} data={accountInfo}/>
      <NewAccountDialog id='newAccountModal' open={newAccountOpen} onClose={() => setNewAccountOpen(prev => !prev)} user={user}/>
    </>
  )
}

// Type Checking
UserPage.propTypes = {
  setPage: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    id: PropTypes.string,
    accounts: PropTypes.object
  })
}

export default UserPage;