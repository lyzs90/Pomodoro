'use strict';

// Pomodoro Action Creators
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

// TodoList Action Creators
let nextTodoId = 0;
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});

export const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});
