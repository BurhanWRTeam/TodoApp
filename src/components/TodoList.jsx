import { useSelector, useDispatch } from "react-redux";
import { addTodo, checkTodo, deleteTodo, editTodo, getAllTodos, } from "../features/todos/todoSlice";
import { useEffect, useRef, useState } from "react";
import { FaTrash, FaPlus, FaEdit, FaSave } from "react-icons/fa";

const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(getAllTodos);

    const [todocontent, setTodoContent] = useState("");
    const [editTodoStatus, setEditTodoStatus] = useState(false);
    const [editId, setEditId] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSubmit = () => {
        dispatch(addTodo({ body: todocontent, completed: false }));
        setTodoContent("");
        inputRef.current.focus();

    };

    const handleEditClick = (todo) => {
        setEditId(todo.id);
        setEditTodoStatus(true);
        setTodoContent(todo.body);
        inputRef.current.focus();

    };

    const handleEditSubmit = () => {
        setEditTodoStatus(false);
        setTodoContent("");
        dispatch(editTodo({ id: editId, body: todocontent }));
    };

    const addTodoComponent = (
        <section >
            <div className='border'>
                <form onSubmit={(e) => e.preventDefault()} >
                    <input
                        ref={inputRef}
                        type='text'
                        id="todoInput"
                        className='todoInput'
                        name="todoInput"
                        value={todocontent}
                        required
                        onChange={(e) => setTodoContent(e.target.value)}
                        placeholder='Add Todo Here'
                    />
                    <button type='button'
                        id="todoEditButton"
                        hidden={!editTodoStatus}
                        className='todoAddButton'
                        onClick={handleEditSubmit} >
                        <FaSave />
                    </button>
                    <button
                        type='submit'
                        id="todoButton"
                        disabled={!todocontent}
                        hidden={editTodoStatus}
                        className='todoAddButton'
                        onClick={handleSubmit} >
                        <FaPlus />
                    </button>
                </form>
            </div>
        </section>
    );
    return (
        <div>
            {addTodoComponent}
            <ul className="todoList">
                <div className="todoMain">
                    {
                        todos.map(todo => (
                            <li key={todo.id} className="todoItem">
                                <div >
                                    <input type="checkbox"
                                        className="todoInputCheckBox"
                                        name="todoInputItem"
                                        value={Number(todo.completed)}
                                        checked={Number(todo.completed)}
                                        onChange={() => dispatch(checkTodo({ id: todo.id }))}
                                    />
                                </div>
                                <div>
                                    <p className="todoBody">{todo.body}</p>
                                </div>
                                <div>
                                    <button className="todoDeleteBtn" onClick={() => dispatch(deleteTodo({ id: todo.id }))}><FaTrash /></button>
                                    <button className="todoEditBtn" onClick={() => handleEditClick(todo)}><FaEdit /></button>
                                </div>

                            </li>
                        ))
                    }
                </div>
            </ul>
        </div>
    );
};

export default TodoList;