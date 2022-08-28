export const initialValue = {
    breackCountDownTimer: 300,
    sessionCountDownTimer: 1500,
    breackLength: 5,
    sessionLength: 25,
    startPauseTimer: false,
    currentTimer: 'session',
    complitedCircles: 0,
}

export const ACTIONS = {
    INCRIMENT: 'increase the timer by one minute',
    DECRIMENT: 'decrise the timer by one minute',
    START_OR_STOP_TIMER: 'timer switch',
    START_TIMER: 'countdown began',
    RESET_TIMER: 'return initial value of the timer',
}

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTIONS.START_OR_STOP_TIMER:
            return {...state, startPauseTimer: !state.startPauseTimer}
        case ACTIONS.INCRIMENT:
            if(state.startPauseTimer === true) {return state}
            if(payload === 'increase_session' && state.sessionLength === 60) {return state}
            if(payload === 'increase_breack' && state.breackLength === 60) {return state}
            if(payload === 'increase_session') {return{...state, sessionCountDownTimer: state.sessionCountDownTimer + 60, sessionLength: state.sessionLength + 1}}
            if(payload === 'increase_breack') {return{...state, breackCountDownTimer: state.breackCountDownTimer + 60, breackLength: state.breackLength + 1}}
            break;
        case ACTIONS.DECRIMENT:
            if(state.startPauseTimer === true) {return state}
            if(payload === 'decrise_session' && state.sessionLength === 1) {return state}
            if(payload === 'decrise_breack' && state.breackLength === 1) {return state}
            if(payload === 'decrise_session' && state.sessionCountDownTimer !== 60) {return{...state, sessionCountDownTimer: state.sessionCountDownTimer - 60, sessionLength: state.sessionLength - 1}}
            if(payload === 'decrise_breack' && state.breackCountDownTimer !== 60) {return{...state, breackCountDownTimer: state.breackCountDownTimer - 60, breackLength: state.breackLength - 1}}
            break;
        case ACTIONS.START_TIMER:
            if(state.breackCountDownTimer !== 0 && state.sessionCountDownTimer !== 0) {return{...state, sessionCountDownTimer: state.sessionCountDownTimer - 1}}
            if(state.breackCountDownTimer !== 0 && state.sessionCountDownTimer === 0) {return{...state, currentTimer: 'break', breackCountDownTimer: state.breackCountDownTimer - 1}}
            if(state.breackCountDownTimer === 0 && state.sessionCountDownTimer === 0) {return{...state, currentTimer: 'session', sessionCountDownTimer: state.sessionLength * 60, breackCountDownTimer: state.breackLength * 60}}
            break;
        case ACTIONS.RESET_TIMER:
            return {...state, currentTimer: initialValue.currentTimer, startPauseTimer: initialValue.startPauseTimer, sessionCountDownTimer: initialValue.sessionCountDownTimer, breackCountDownTimer: initialValue.breackCountDownTimer, sessionLength: initialValue.sessionLength, breackLength: initialValue.breackLength}
        default:
            return state
    }
}