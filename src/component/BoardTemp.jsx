import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

const BoardTemp = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <div className="flex flex-col">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
          {(provided) => (
            <div
              className="p-4 m-2 bg-gray-200 border rounded-md"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
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
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default BoardTemp;
