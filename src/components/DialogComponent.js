/*
  Component for displaying dialog box.
*/

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import './styles/AccountDialog.css';

const DialogComponent = ({ title, content, actions, open }) => {
    return (
        <Dialog open={open}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {content}
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
    )
}

// Type checking
DialogComponent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.element,
  actions: PropTypes.element,
  open: PropTypes.bool
}

export default DialogComponent;