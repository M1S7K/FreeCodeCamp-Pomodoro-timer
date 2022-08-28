import React, { useEffect, useRef, useState } from 'react';

function Timer() {
const [countDownTimer, setCountDownTimer] = useState(1500);
const [startStopTimer, setStartStopTimer] = useState(false);
const firstStart = useRef(true);
const tick = useRef();

useEffect(() => {
    if(firstStart.current === true){
        firstStart.current = !firstStart.current;
        return;
    }
    if(startStopTimer === true && countDownTimer !== 0){
    tick.current = setInterval(() => {
        setCountDownTimer((prev) => prev - 1)
    }, 1000);
} else {
    clearInterval(tick.current)
}
return () => clearInterval(tick.current)
},[startStopTimer, countDownTimer])

const restartTimer = () => {
    if(countDownTimer !== 1500){
        setCountDownTimer(1500)
    }
}

const displaySecondsAsMinutes = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2,'0');
    return minutes + ":" + seconds
}

const decriseTimer = () => {
    if(countDownTimer !== 60 && startStopTimer === false){
    setCountDownTimer((prev) => prev - 60)
    }
}

const increaseTimer = () => {
    if(countDownTimer !== 3600 && startStopTimer === false){
        setCountDownTimer((prev) => prev + 60)
    }
}

  return (
    <>
    <div className='timer'>
        <h1>Session</h1>
        <h1>{displaySecondsAsMinutes(countDownTimer)}</h1>
        <div className='timer-buttons'>
            <div className='timer-buttons-settings'>
                <button onClick={increaseTimer}>increase</button>
                <button onClick={decriseTimer}>decrise</button>
            </div>
            <button onClick={() => { setStartStopTimer((prev) => !prev) }}>{startStopTimer === !true ? "START" : "PAUSE"}</button>
            <button onClick={restartTimer}>RESTART</button>
        </div>
    </div>
    </>
  )
}

export default Timer
