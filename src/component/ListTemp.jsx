import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

const ListTemp = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <ul className="list-disc pl-6">
      {tasks.map((task) => (
        <li key={task.id} className="mb-4 p-4 bg-white border rounded-md shadow-md flex items-center justify-between">
          <span
            className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}
          >
            {task.title}
          </span>
          <div className="flex space-x-2">
            <button
              className="px-2 py-1 text-red-500 rounded"
              onClick={() => onDelete(task.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              className="px-2 py-1 rounded"
              onClick={() => onEdit(task.id, prompt('Edit task:', task.title))}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            {!task.completed && (
              <button
                className="px-2 py-1 rounded"
                onClick={() => onComplete(task.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListTemp;
