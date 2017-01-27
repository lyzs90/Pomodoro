'use strict';

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

export default btnVisiblity;
