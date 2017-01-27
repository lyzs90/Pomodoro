'use strict';

import { combineReducers } from 'redux';
import deepEqual from 'deep-equal';

const bigTime = (state = 1500, action) => {
    switch (action.type) {
        case 'COUNTDOWN':
            return state - 1;
        case 'COOLDOWN':
            return 300;
        case 'RESET_TIMER':
            return 1500;
        default:
            return state;
    }
};

const btnVisiblity = (state = ['', 'hide', 'hide'], action) => {
    switch (action.type) {
        case 'CHANGE_BUTTON':
            if (deepEqual(state, ['', 'hide', 'hide'])) {
                return ['hide', '', 'hide'];
            }
            if (deepEqual(state, ['hide', '', 'hide'])) {
                return ['hide', 'hide', ''];
            }
            if (deepEqual(state, ['hide', 'hide', ''])) {
                return ['', 'hide', 'hide'];
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    bigTime,
    btnVisiblity
});

export default rootReducer;
