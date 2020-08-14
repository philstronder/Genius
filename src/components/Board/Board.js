import React from 'react';
import classes from './Board.module.css'
import Button from '../UI/Button/Button'
import { useEffect, useRef } from 'react';
import {useDispatch} from 'react-redux';


export default function Board() {
    let arrSequence = [];
    let currentPressedIndex = 0;
    const dispatch = useDispatch();

    const btn1 = useRef(null);
    const btn2 = useRef(null);
    const btn3 = useRef(null);
    const btn4 = useRef(null);
    const gameOver = useRef(null);
    const prepare = useRef(null);

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
        for(var i = 0; i <= arrSequence.length; i++) {
            let el;

            switch(arrSequence[i]) {
                case 1:
                    el = btn1.current;
                    break;
                case 2:
                    el = btn2.current;
                    break;
                case 3:
                    el = btn3.current;
                    break;
                case 4:
                    el = btn4.current;
                    break;
                default:
                    break;
            }

            if(!!el) {
                el.classList.add(classes.active);   
                playAudio(el);
                await sleep(200);
                el.classList.remove(classes.active);    
                await sleep(150);
            }
        }
    }

    const resetAllButtons = () => {
        const buttons = document.getElementsByClassName(classes.button);
        
        Array.from(buttons).forEach(item => {
            item.classList.remove('active');
        });
    }

    async function startClickHandler() {
        dispatch({type: 'RESTART'});
        resetAllButtons();
        gameOver.current.setAttribute('style', 'display: none;');
        arrSequence = [];
        populateSequenceArray(0);
        currentPressedIndex = 0;

        prepare.current.setAttribute('style', 'display: inline;');
        await sleep(1200);
        prepare.current.setAttribute('style', 'display: none;');
        await sleep(500);
        readSequence();
    }

    useEffect(() => {
        gameOver.current.setAttribute('style', 'display: none;');
        
        //Click handler
        const container = document.getElementsByClassName(classes.container);
        Array.from(container).forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target.classList.contains(classes.button)) {
                    //Visually shows that the element is active
                    e.target.classList.add(classes.active);
                    setTimeout(() => {
                        e.target.classList.remove(classes.active);
                    }, 500);               
                }
                
                playAudio(e.target);
    
                //Check if pressed button is correct
                checkButton(e.target);
            });
        });
    }, []);

    function playAudio(el) {
        let audio;
        if(el.classList.contains(classes.first)) {
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
            audio.play();
        } else if (el.classList.contains(classes.second)){
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
            audio.play();
        } else if (el.classList.contains(classes.third)) {
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
            audio.play();
        } else if (el.classList.contains(classes.fourth)) {
            audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
            audio.play();
        }
    }

    const checkButton = async (el) => {
        let pressedButton;

        if(el.classList.contains(classes.first)) {
            pressedButton = 1;
        } else if (el.classList.contains(classes.second)){
            pressedButton = 2;
        } else if (el.classList.contains(classes.third)) {
            pressedButton = 3;
        } else if (el.classList.contains(classes.fourth)) {
            pressedButton = 4;
        }  else {
            return;
        }

        if(arrSequence[currentPressedIndex] === pressedButton) {
            //If reached end of sequence
            if(currentPressedIndex + 1 === arrSequence.length) {

                //Restart the pressed sequence
                currentPressedIndex = 0;

                //Increments sequence
                populateSequenceArray(arrSequence.length);

                //Increment score
                dispatch({type: 'INCREMENT'});

                await sleep(2000);

                //Visually displays the new sequence
                readSequence();
                
            } else {
                currentPressedIndex++;
            }
        } else {
            showGameOver();
        }
    }

    const showGameOver = async () => {
        await sleep(300);
        gameOver.current.setAttribute('style', 'display: inline;');
        arrSequence = [];
    }

    const classBtn1 = [classes.button, classes.first].join(' ');
    const classBtn2 = [classes.button, classes.second].join(' ');
    const classBtn3 = [classes.button, classes.third].join(' ');
    const classBtn4 = [classes.button, classes.fourth].join(' ');

    return(
        <>
            <div className={classes.container}>
                <div className={classes.board}>
                    <div className={classBtn1} ref={btn1}></div>
                    <div className={classBtn2} ref={btn2}></div>
                    <div className={classBtn3} ref={btn3}></div>
                    <div className={classBtn4} ref={btn4}></div>
                    <div className={classes.gameOver} ref={gameOver}>GAME OVER</div>
                    <div className={classes.prepare} ref={prepare}>PREPARE</div>
                </div>

                <Button click={startClickHandler} title='Start' type='Start'/>  
            </div>
        </>
    );
}