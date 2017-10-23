'use strict';

import { combineReducers } from 'redux';
import bigTime from './bigTime';
import btnVisiblity from './btnVisibility';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import bgImage from './bgImage';

const rootReducer = combineReducers({
    bigTime,
    btnVisiblity,
    todos,
    visibilityFilter,
    bgImage
});

export default rootReducer;
