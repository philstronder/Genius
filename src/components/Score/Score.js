import React, {useEffect, useState} from 'react';
import classes from './Score.module.css'
import {useSelector} from 'react-redux';
import axios from 'axios'
import { bindActionCreators } from 'redux';

export default function Score() {
    const counter = useSelector((state) => state.counter);

    const [IsNewRecord, setIsNewRecord] = useState(false)
    const [currentRecord, setCurrentRecord] = useState()
    
    //get record
    useEffect(() => {
        axios.get('https://lkysgfb4fc.execute-api.us-east-1.amazonaws.com/dev')
            .then(res => {
                setCurrentRecord(res.data.Items[0].record)
            })
    }, [])

    //check if counter > record for each counter change
    useEffect(() => {
        if(counter > currentRecord) {
            setIsNewRecord(true)
        }
    }, [counter])

    const newRecord = IsNewRecord ? 'NEW RECORD!' : ''

    return(
        <div className={classes.container}>
            <div className={classes.score}>
                SCORE: {counter}
            </div>
            <div className={classes.record}>{newRecord}</div>
        </div>
    );
}
