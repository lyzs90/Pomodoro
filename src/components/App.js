'use strict';

import React from 'react';
import Pomodoro from '../containers/Pomodoro';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const App = () => {
    return (
        <div>
            <Pomodoro />
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    );
};

export default App;
