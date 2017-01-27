'use strict';

import { combineReducers } from 'redux';
import bigTime from './bigTime';
import btnVisiblity from './btnVisibility';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
    bigTime,
    btnVisiblity,
    todos,
    visibilityFilter
});

export default rootReducer;
