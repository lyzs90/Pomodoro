'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';
import App from './components/App';

const sagaMiddleware = createSagaMiddleware();
const enhancers = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
);
const store = createStore(
    rootReducer,
    enhancers
);
sagaMiddleware.run(rootSaga);

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers').default;
        store.replaceReducer(nextRootReducer);
    })
}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
