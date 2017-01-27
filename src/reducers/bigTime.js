'use strict';

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

export default bigTime;
