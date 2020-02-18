import React from 'react';
import { directive } from '@babel/types';
import classes from './Board.module.css'
import Button from '../UI/Button/Button'
import $ from 'jquery';
import { useEffect } from 'react';



export default function Board() {
    function sleep(ms) {
        return new Promise(resolver => {
            setTimeout(resolver, ms);
        });
    }


    async function startClickHandler() {
        let arr = [1, 2, 3];

        for(var i = 1; i <= arr.length; i++) {
            $('#btn' + i).addClass(classes.active);   
            setTimeout(() => {
                $('#btn' + i).removeClass(classes.active);    
            }, 500);   

            await sleep(1000);
            console.log('attempt #' + i);
        }
    }

    useEffect(() => {
        
        $('.' + classes.container).click((e) => {
            //Visually shows that the element is active
            e.target.classList.add(classes.active);
            setTimeout(() => {
                e.target.classList.remove(classes.active);
            }, 500);

            //Plays key audio
            let audio;
            if(e.target.classList.contains(classes.first)) {
                audio = new Audio('button1.mp3');
                audio.play();
            } else if (e.target.classList.contains(classes.second)){
                audio = new Audio('button2.mp3');
                audio.play();
            } else if (e.target.classList.contains(classes.third)) {
                audio = new Audio('button3.mp3');
                audio.play();
            } else if (e.target.classList.contains(classes.fourth)) {
                audio = new Audio('button4.mp3');
                audio.play();
            }
            
        });
    });

    const classBtn1 = [classes.button, classes.first].join(' ');
    const classBtn2 = [classes.button, classes.second].join(' ');
    const classBtn3 = [classes.button, classes.third].join(' ');
    const classBtn4 = [classes.button, classes.fourth].join(' ');

    return(
        <>
            <div className={classes.container}>
                <div className={classBtn1} id='btn1'></div>
                <div className={classBtn2} id='btn2'></div>
                <div className={classBtn3} id='btn3'></div>
                <div className={classBtn4} id='btn4'></div>
            </div>
            <Button click={startClickHandler} title='Start' type='Start'/>
        </>
    );
}