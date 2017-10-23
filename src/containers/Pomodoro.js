'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Pomodoro from '../components/Pomodoro';
import { countdown, cooldown, resetTimer, changeButton, fetchBackgroundImage } from '../actions';

const mapStateToProps = (state) => ({
    bigTime: state.bigTime,
    btnVisiblity: state.btnVisiblity,
    bgImage: state.bgImage
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
    },
    fetchImage: (collection) => {
        dispatch({type: 'FETCH_IMAGE_REQUESTED', payload: {collection}})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
