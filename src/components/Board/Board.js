import React from 'react';
import classes from './Board.module.css'
import Button from '../UI/Button/Button'
import $ from 'jquery';
import { useEffect } from 'react';
import Score from '../Score/Score';



export default function Board() {
    let arrSequence = [];
    let currentPressedIndex = 0;

    function sleep(ms) {
        return new Promise(resolver => {
            setTimeout(resolver, ms);
        });
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const populateSequenceArray = (pos) => {
        arrSequence[pos] = getRandomInt(1, 4);  
    }

    const readSequence = async () => {
        let el;
        for(var i = 0; i <= arrSequence.length; i++) {
            el = $('#btn' + arrSequence[i])
            el.addClass(classes.active);   
            playAudio(el);
            await sleep(500);
            el.removeClass(classes.active);    
            await sleep(300);
        }
    }

    const resetAllButtons = () => {
        $('.' + classes.button).removeClass('active');
    }

    async function startClickHandler() {
        resetAllButtons();
        $('.' + classes.gameOver).attr('style', 'display: none');
        arrSequence = [];
        populateSequenceArray(0);
        currentPressedIndex = 0;

        $('.' + classes.prepare).attr('style', 'display: block');
        await sleep(1200);
        $('.' + classes.prepare).attr('style', 'display: none');
        await sleep(500);
        readSequence();
    }

    useEffect(() => {
        //Click handler
        $('.' + classes.container).click((e) => {
            if(e.target.classList.contains(classes.button)) {
                //Visually shows that the element is active
                e.target.classList.add(classes.active);
                setTimeout(() => {
                    e.target.classList.remove(classes.active);
                }, 500);               
            }
            
           playAudio($(e.target));

            //Check if pressed button is correct
            checkButton($(e.target));
        });
    });

    function playAudio(el) {
        let audio;
        if(el.hasClass(classes.first)) {
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
            audio.play();
        } else if (el.hasClass(classes.second)){
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
            audio.play();
        } else if (el.hasClass(classes.third)) {
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
            audio.play();
        } else if (el.hasClass(classes.fourth)) {
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
            audio.play();
        }
    }

    const checkButton = async (el) => {
        let pressedButton;
        if(el.hasClass(classes.first)) {
            pressedButton = 1;
        } else if (el.hasClass(classes.second)){
            pressedButton = 2;
        } else if (el.hasClass(classes.third)) {
            pressedButton = 3;
        } else if (el.hasClass(classes.fourth)) {
            pressedButton = 4;
        }  else {
            return;
        }

        if(arrSequence[currentPressedIndex] == pressedButton){
            //If reached end of sequence
            if(currentPressedIndex + 1 == arrSequence.length) {

                //Restart the pressed sequence
                currentPressedIndex = 0;

                //Increments sequence
                populateSequenceArray(arrSequence.length);

                await sleep(2000);

                //Visually displays the new sequence
                readSequence();
                
            } else {
                currentPressedIndex++;

                //TODO: Increase score
            }
        } else {
            gameOver();
        }
    }

    const gameOver = () => {
        $('.' + classes.gameOver).attr('style', 'display: block');
        arrSequence = [];
    }

    const classBtn1 = [classes.button, classes.first].join(' ');
    const classBtn2 = [classes.button, classes.second].join(' ');
    const classBtn3 = [classes.button, classes.third].join(' ');
    const classBtn4 = [classes.button, classes.fourth].join(' ');

    return(
        <>
            <Score/>
            <div className={classes.container}>
                <div className={classBtn1} id='btn1'></div>
                <div className={classBtn2} id='btn2'></div>
                <div className={classBtn3} id='btn3'></div>
                <div className={classBtn4} id='btn4'></div>
                <div className={classes.gameOver}>GAME OVER</div>
                <div className={classes.prepare}>PREPARE</div>
            </div>
            <Button click={startClickHandler} title='Start' type='Start'/>  
        </>
    );
}