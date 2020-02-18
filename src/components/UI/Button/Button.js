import React from 'react';
import classes from './Button.module.css'

export default function Button (props) {
    return (
        <div className={classes.container}>
            <button className={classes.button} onClick={props.click}>{props.title}</button>
        </div>
    );
}