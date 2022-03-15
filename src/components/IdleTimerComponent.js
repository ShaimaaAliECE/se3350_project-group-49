import React, {useRef, useState} from 'react';
import IdleTimer from 'react-idle-timer'
import {useHistory} from 'react-router-dom'



function IdleTimerComponent(){
const history = useHistory()
const idleTimerRef=useRef(null)

const onIdle = () =>{alert('You have been idle for at least 5 minutes'); history.push('/home')}


// timeout is in milleseconds to get seconds multiple by 1000
    return(
<div>
<IdleTimer ref={idleTimerRef} timeout={10*1000} onIdle={onIdle}></IdleTimer>
</div>
    )  
}

export default IdleTimerComponent