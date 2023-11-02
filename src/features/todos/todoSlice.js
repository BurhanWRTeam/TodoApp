import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const id = state.todos.length ? state.todos[state.todos.length - 1].id + 1 : 1;
            state.todos = [...state.todos, { ...action.payload, id }];
        },
        checkTodo: (state, action) => {
            const { id } = action.payload;
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== id) {
                        return todo;
                    }
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                })
            };
        },
        deleteTodo: (state, action) => {
            const { id } = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== id);
        },
        editTodo: (state, action) => {
            const { id, body } = action.payload;
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.id !== id) {
                        return todo;
                    }
                    return {
                        ...todo,
                        body: body
                    };
                })
            };
        }
    }
});

export const getAllTodos = (state) => state.todos;

export const { addTodo, checkTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;