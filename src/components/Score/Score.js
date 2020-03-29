import React from 'react';
import classes from './Score.module.css'
export default function Score() {
    return(
        <div className={classes.container}>
            <div className={classes.score}>
                124
            </div>
            <div className={classes.record}>NEW RECORD!</div>
        </div>
    );
}
