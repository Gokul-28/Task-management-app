import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import BoardTemp from './BoardTemp';
import ListTemp from './ListTemp';

const TaskMang = () => {
    const [tasksList, setTasksList] = useState([]);
    const [task, setTask] = useState('');
    const [view, setView] = useState('board');

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
        movedTask.inProgress = result.destination.droppableId === 'done';
        updatedTasks.splice(result.destination.index, 0, movedTask);

        setTasksList(updatedTasks);
    };

    return (
            <div className="flex flex-col items-center bg-gray-800 text-white min-h-screen">
                <h1 className="text-4xl font-bold text-blue-600 mt-8 ml-4 mb-6">
                    Task Management Application
                </h1>
                <div className="flex flex-col items-center">
                    {/* Input and Button */}
                    <input
                        type="text"
                        placeholder="Enter task"
                        value={task}
                        onChange={handleInputChange}
                        className="p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleAddTask}
                        className="px-4 py-2 bg-blue-500 text-white rounded mb-8"
                    >
                        Add Task
                    </button>
                </div>
                <div className="w-full md:w-96">
                    <div className="flex flex-col items-center">
                        {/* Separate Tab Colors */}
                        <ul className="flex flex-wrap text-sm font-medium text-center border-b mb-4">
                            <li className="me-2">
                                <a
                                    href="#"
                                    className={`inline-block px-4 py-3 rounded-lg ${view === 'board'
                                        ? 'bg-gray-600 text-white'
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
                                        ? 'bg-gray-600 text-white'
                                        : 'hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white'
                                        }`}
                                    onClick={() => setView('list')}
                                >
                                    List
                                </a>
                            </li>
                        </ul>
        
                        {/* Container for the content */}
                        <div className="border rounded-md p-4 w-full max-w-3xl bg-gray-700">
                            {/* View based on the selected tab */}
                            {view === 'board' && (
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="todo" type="TASK">
                                        {(provided) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className="p-4 m-2 bg-gray-600 border rounded-md"
                                            >
                                                <h2 className="text-xl font-semibold mb-2">To Do</h2>
                                                <BoardTemp
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
                                                className="p-4 m-2 bg-gray-600 border rounded-md"
                                            >
                                                <h2 className="text-xl font-semibold mb-2">Done</h2>
                                                <BoardTemp
                                                    tasks={tasksList.filter((task) => task.completed)}
                                                    onDelete={handleDelete}
                                                    onEdit={handleEdit}
                                                    onComplete={handleComplete}
                                                />
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            )}
        
                            {view === 'list' && (
                                <ul className="p-4 m-2 bg-gray-600 border rounded-md">
                                    <h2 className="text-xl font-semibold mb-2">To Do</h2>
                                    <ListTemp
                                        tasks={tasksList.filter((task) => !task.completed)}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        onComplete={handleComplete}
                                    />
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
        
};

export default TaskMang;
