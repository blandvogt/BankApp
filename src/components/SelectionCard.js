import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './styles/SelectionCard.css';

const SeletionCard = ({ data, handleClick }) => {
    return (
        <Card id='card' onClick={() => handleClick(data)}>
            <CardContent>
                <Typography align='center' variant='h5'>{data.name}</Typography>
                <Typography align='center' variant='subtitle1'>{`$${data.balance}`}</Typography>
            </CardContent>
        </Card>
    )
}

export default SeletionCard;