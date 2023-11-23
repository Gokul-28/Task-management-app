// BoardView.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const BoardView = ({ tasks, onDelete, onEdit, onComplete }) => {
  return (
    <div className="flex">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={`task-${task.id}`} index={index}>
          {(provided) => (
            <div
              className="p-4 m-2 bg-gray-200 border rounded-md"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div>
                {task.title}
                <button
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </button>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => onEdit(task.id, prompt('Edit task:', task.title))}
                >
                  Edit
                </button>
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => onComplete(task.id)}
                >
                  Complete
                </button>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default BoardView;
