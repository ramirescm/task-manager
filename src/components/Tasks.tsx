import React from "react";
import Task from "./Task";

const Tasks = ({
  tasks,
  handleTaskClick,
  handleTaskRemove,
}: {
  tasks: any[];
  handleTaskClick({ taskId }: { taskId: string }): void;
  handleTaskRemove({ taskId }: { taskId: string }): void;
}) => {
  return (
    <>
      {tasks.map((task: any) => (
        <Task
          key={task.id}
          task={task}
          handleTaskClick={handleTaskClick}
          handleTaskRemove={handleTaskRemove}
        />
      ))}
    </>
  );
};

export default Tasks;
