import React from 'react';
import classes from './Score.module.css'
import {useSelector} from 'react-redux';

export default function Score() {
    const counter = useSelector((state) => state.counter);

    return(
        <div className={classes.container}>
            <div className={classes.score}>
                SCORE: {counter}
            </div>
            <div className={classes.record}>NEW RECORD!</div>
        </div>
    );
}
