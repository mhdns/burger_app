import React from 'react';
import classes from './Backdrop.css';

const backdop = (props) => (
    props.show ? <div className={ classes.Backdrop } onClick={ props.clicked }></div> : null
);

export default backdop;