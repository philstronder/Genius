import React from 'react';
import { directive } from '@babel/types';
import './Board.css'
import $ from 'jquery';
import { useEffect } from 'react';



export default function Board() {
    useEffect(() => {
        
        $('.container').click((e) => {
            //Visually shows that the element is active
            e.target.classList.add('active');
            setTimeout(() => {
                e.target.classList.remove('active');
            }, 500);

            //Plays key audio
            let audio;
            if(e.target.classList.contains('first')) {
                audio = new Audio('button1.mp3');
                audio.play();
            } else if (e.target.classList.contains('second')){
                audio = new Audio('button2.mp3');
                audio.play();
            } else if (e.target.classList.contains('third')) {
                audio = new Audio('button3.mp3');
                audio.play();
            } else if (e.target.classList.contains('fourth')) {
                audio = new Audio('button4.mp3');
                audio.play();
            }
            
        });
    });

    return(
        <div className='container'>
            <div className='button first' id='btn1'></div>
            <div className='button second' id='btn2'></div>
            <div className='button third' id='btn3'></div>
            <div className='button fourth' id='btn4'></div>
        </div>
    );
}