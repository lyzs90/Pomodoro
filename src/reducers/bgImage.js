'use strict';

const bgImage = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_IMAGE_SUCCEEDED':
            return action.image;
        case 'FETCH_IMAGE_FAILED':
            console.log(action.message);
            return state;
        default:
            return state;
    }
}

export default bgImage;
