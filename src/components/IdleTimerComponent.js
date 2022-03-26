import React, {useRef, useState} from 'react';
import IdleTimer from 'react-idle-timer'
import {useNavigate} from 'react-router-dom'



function IdleTimerComponent(){
const navigate = useNavigate()
const idleTimerRef=useRef(null)

const onIdle = () =>{alert('You have been idle for at least 5 minutes'); navigate('/home')}


// timeout is in milleseconds to get seconds multiple by 1000
    return(
<div>
<IdleTimer ref={idleTimerRef} timeout={300*1000} onIdle={onIdle}></IdleTimer>
</div>
    )  
}

export default IdleTimerComponent