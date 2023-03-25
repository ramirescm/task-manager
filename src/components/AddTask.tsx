import React, { useState } from "react";
import "./AddTask.css";
import Button from "./Button";

const AddTask = ({
  handleTaskAddition,
}: {
  handleTaskAddition({ taskTitle }: { taskTitle: string }): void;
}) => {
  const [inputData, setInputData] = useState("");

  const handleInputOnChange = (e: any) => {
    setInputData(e.target.value);
  };

  const handleAddTaskClick = () => {
    console.log(inputData);
    handleTaskAddition({ taskTitle: inputData });
    setInputData("");
  };

  return (
    <div className="add-task-container">
      <input
        onChange={handleInputOnChange}
        value={inputData}
        className="add-task-input"
        type="text"
      />
      <div className="add-task-button-container">
        <Button onClick={handleAddTaskClick}>Adicionar</Button>
      </div>
    </div>
  );
};

export default AddTask;
