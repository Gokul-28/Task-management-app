import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import BoardView from './BoardView';
import TaskList from './TaskList';

const BoardList = () => {
    const [tasksList, setTasksList] = useState([]);
    const [task, setTask] = useState('');
    const [view, setView] = useState('board'); // Added missing state for the selected view

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleAddTask = () => {
        if (task.trim() === '') return;

        const newTask = {
            id: new Date().getTime(),
            title: task,
        };

        setTasksList((prevTasks) => [...prevTasks, newTask]);
        setTask('');
    };

    const handleDelete = (taskId) => {
        setTasksList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const handleEdit = (taskId, editedTitle) => {
        setTasksList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, title: editedTitle } : task
            )
        );
    };

    const handleComplete = (taskId) => {
        setTasksList((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: true } : task
            )
        );
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasksList];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);
        movedTask.inProgress = result.destination.droppableId === 'done'; // Assuming 'done' is the DroppableId for the 'Done' column
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasksList(updatedTasks);
    };

    return (
        <>
 <h1 class="text-4xl font-bold text-blue-600 mt-8 ml-4">Task Management Application</h1>
            <div className='flex flex-col items-center'>
                {/* Input and Button */}
                <input
                    type="text"
                    placeholder="Enter task"
                    value={task}
                    onChange={handleInputChange}
                    className="p-2 border rounded mb-2 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4"
                />
                <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add Task
                </button>
            </div>
            <div className="w-96">
                

                {/* Tab Navigation */}
                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-block px-4 py-3 rounded-lg ${view === 'board'
                                ? 'text-white bg-blue-600'
                                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
                                }`}
                            onClick={() => setView('board')}
                        >
                            Board
                        </a>
                    </li>
                    <li className="me-2">
                        <a
                            href="#"
                            className={`inline-block px-4 py-3 rounded-lg ${view === 'list'
                                ? 'text-white bg-blue-600'
                                : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
                                }`}
                            onClick={() => setView('list')}
                        >
                            List
                        </a>
                    </li>
                </ul>



                {/* View based on the selected tab */}
                {view === 'board' && (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="flex">
                            <Droppable droppableId="todo" type="TASK">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="p-4 m-2 bg-gray-300 border rounded-md"
                                    >
                                        <h2 className="text-xl font-semibold mb-2">To Do</h2>
                                        <BoardView
                                            tasks={tasksList.filter((task) => !task.completed)}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                            onComplete={handleComplete}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            <Droppable droppableId="done" type="TASK">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="p-4 m-2 bg-gray-300 border rounded-md"
                                    >
                                        <h2 className="text-xl font-semibold mb-2">Done</h2>
                                        <BoardView
                                            tasks={tasksList.filter((task) => task.completed)}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                            onComplete={handleComplete}
                                        />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                )}

                {view === 'list' && (
                    <ul className="p-4 m-2 bg-gray-300 border rounded-md">
                        <h2 className="text-xl font-semibold mb-2">To Do</h2>
                        <TaskList
                            tasks={tasksList.filter((task) => !task.completed)}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onComplete={handleComplete}
                        />
                    </ul>
                )}
            </div>
        </>
    );

};

export default BoardList;
