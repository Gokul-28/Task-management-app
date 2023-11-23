// TaskList.js
import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <ul className="list-disc pl-6">
      {tasks.map((task) => (
        <li key={task.id} className="mb-2">
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </span>
          <button className="ml-2 text-red-500" onClick={() => onDelete(task.id)}>
            Delete
          </button>
          <button className="ml-2" onClick={() => onEdit(task.id, prompt('Edit task:', task.title))}>
            Edit
          </button>
          {!task.completed && (
            <button className="ml-2" onClick={() => onComplete(task.id)}>
              Complete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
