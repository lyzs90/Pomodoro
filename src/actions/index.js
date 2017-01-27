'use strict';

export const countdown = () => ({
    type: 'COUNTDOWN'
});

export const cooldown = () => ({
    type: 'COOLDOWN'
});

export const resetTimer = () => ({
    type: 'RESET_TIMER'
});

export const changeButton = () => ({
    type: 'CHANGE_BUTTON'
});

let nextTodoId = 0;
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});
