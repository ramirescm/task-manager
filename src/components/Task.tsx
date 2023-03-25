import React from "react";
import "./Task.css";
import { CgClose, CgInfo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Task = ({
  task,
  handleTaskClick,
  handleTaskRemove,
}: {
  task: any;
  handleTaskClick({ taskId }: { taskId: string }): void;
  handleTaskRemove({ taskId }: { taskId: string }): void;
}) => {
  const navigate = useNavigate();
  const handleTaskDetailsClick = () => {
    navigate(`/${task.title}`);
  };

  return (
    <div
      className="task-container"
      style={task.completed ? { borderLeft: "6px solid chartreuse" } : {}}
    >
      <div
        className="task-title"
        onClick={() => handleTaskClick({ taskId: task.id })}
      >
        {task.title}
      </div>

      <div className="buttons-container">
        <button
          className="see-task-details-button"
          onClick={handleTaskDetailsClick}
        >
          <CgInfo />
        </button>
        <button
          className="remove-task-button"
          onClick={() => handleTaskRemove({ taskId: task.id })}
        >
          <CgClose />
        </button>
      </div>
    </div>
  );
};

export default Task;
