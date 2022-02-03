import logo from './logo.svg';
import './App.css';

import React, {useState, useReducer, useEffect, useRef, useCallback} from 'react';

function compare(a, b){
    return ['compare', a,b];
}

function swap(a,b){
    return ['swap', a,b];
}

function* bubblesort(from, to)
{
let swapped

do{
    swapped =false; 
    to -=1;

    for(let j=from; j<to; j++){
        if((yield compare(j,j+1))>0)
        {
            yield swap(j,j+1);
            swapped=true;
        }
            }

        }while(swapped);

}


let action=[false,0,1]
let action2=[false,0,1]


