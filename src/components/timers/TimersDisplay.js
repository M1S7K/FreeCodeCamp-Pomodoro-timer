import React, { useEffect, useReducer, useRef } from 'react'
import {ACTIONS, reducer, initialValue} from '../reducer/Reducer'
import { FaArrowUp, FaArrowDown, FaPlay, FaStop, FaRedoAlt } from 'react-icons/fa'
import '../App.css'

const displaySecondsAsMinutes = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = Math.floor(time % 60).toString().padStart(2,'0');
    return minutes + ":" + seconds
}

function TimersDisplay() {
    const[{breackCountDownTimer, sessionCountDownTimer, sessionLength, breackLength, startPauseTimer, currentTimer}, dispatch] = useReducer(reducer, initialValue)
    const firstStart = useRef(true)
    const tick = useRef()
    const audioBeep = useRef()
    useEffect(() => {
        if(currentTimer === 'session' && sessionCountDownTimer === 0){audioBeep.current.currentTime = 0; audioBeep.current.play()}
        if(currentTimer === 'break' && breackCountDownTimer === 0){audioBeep.current.currentTime = 0; audioBeep.current.play()}
        if(firstStart.current === true){
            firstStart.current = !firstStart.current;
            return;
        }
        if(startPauseTimer === true){
        tick.current = setInterval(() => {
            dispatch({ type: ACTIONS.START_TIMER })
        }, 1000);
    } else {
        clearInterval(tick.current)
    }
    return () => clearInterval(tick.current)
    }, [sessionCountDownTimer, startPauseTimer, breackCountDownTimer, currentTimer])

  return (
    <>
    <div className={sessionCountDownTimer === 0 ? 'pomodoro-timer-rest-mode' : 'pomodoro-timer-focus-mode'}>
        <h1 className='pomodoro-timer-tittle'>POMODORO TIMER</h1>
        <h3 className='pomodoro-timer-tittle-additional'>Focus on your work and don't be distracted for only {sessionLength} minute{sessionLength < 2 ? "" : "s"}</h3>
        <div className='pomodoro-timer-settings'>
        <div className='pomodoro-timer-break-settings'>
            <h2 id='break-label'>Break Length</h2>
            <p className='pomodoro-timer-settings-length' id="break-length">{breackLength}</p>
            <div className='pomodoro-timer-settings-break-buttons'>
                <button className='pomodoro-timer-settings-break-button' id="break-increment" onClick={() => dispatch({ type: ACTIONS.INCRIMENT, payload: 'increase_breack' })}><FaArrowUp /></button>
                <button className='pomodoro-timer-settings-break-button' id="break-decrement" onClick={() => dispatch({ type: ACTIONS.DECRIMENT, payload: 'decrise_breack' })}><FaArrowDown /></button>
            </div>
        </div>
        <div className='pomodoro-timer-session-settings'>
            <h2 id="session-label">Session Length</h2>
            <p className='pomodoro-timer-settings-length' id="session-length">{sessionLength}</p>
            <div className='pomodoro-timer-settings-session-buttons'>
            <button className='pomodoro-timer-settings-session-button' id="session-increment" onClick={() => dispatch({ type: ACTIONS.INCRIMENT, payload: 'increase_session' })}><FaArrowUp /></button>
            <button className='pomodoro-timer-settings-session-button' id="session-decrement" onClick={() => dispatch({ type: ACTIONS.DECRIMENT, payload: 'decrise_session' })}><FaArrowDown /></button>
            </div>
        </div>
        </div>
        <div className='pomodoro-timer-current-run' style={ (sessionCountDownTimer < 60 && currentTimer === 'session') || (breackCountDownTimer < 60 && currentTimer === 'break') ? {animation: `myanim 3s infinite`} : {} }>
        <p className='pomodoro-timer-current-run-tittle' id="timer-label">{currentTimer === 'break' ? "Break" : "Session"}</p>
        <p id="time-left" className={(sessionCountDownTimer < 60 && currentTimer === 'session') || (breackCountDownTimer < 60 && currentTimer === 'break') ? 'pomodoro-timer-display-alert' : 'pomodoro-timer-display'}>
            {currentTimer === 'break' ? displaySecondsAsMinutes(breackCountDownTimer) : displaySecondsAsMinutes(sessionCountDownTimer)}
        </p>
        <div className='pomodoro-timer-current-run-buttons'>
      <button className='pomodoro-timer-current-run-button' id="start_stop" onClick={() => dispatch({ type: ACTIONS.START_OR_STOP_TIMER })}>{startPauseTimer === false ? <FaPlay /> : <FaStop />}</button>
      <button className='pomodoro-timer-current-run-button' id="reset" onClick={() => dispatch({ type: ACTIONS.RESET_TIMER })}><FaRedoAlt /></button>
        </div>
      <audio id="beep" preload='auto' ref={(audio) => {audioBeep.current = audio}} src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' />
        </div>
    </div>
    </>
  )
}

export default TimersDisplay
