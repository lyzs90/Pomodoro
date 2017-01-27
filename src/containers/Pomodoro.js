'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Pomodoro from '../components/Pomodoro';
import { countdown, cooldown, resetTimer, changeButton } from '../actions';

const mapStateToProps = (state) => ({
    bigTime: state.bigTime,
    btnVisiblity: state.btnVisiblity
});

const mapDispatchToProps = (dispatch) => ({
    countdown: () => {
        dispatch(countdown());
    },
    cooldown: () => {
        dispatch(cooldown());
    },
    resetTimer: () => {
        dispatch(resetTimer());
    },
    changeButton: () => {
        dispatch(changeButton());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
