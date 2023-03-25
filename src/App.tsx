import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import TaskDetails from "./components/TaskDetails";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: "a1",
      title: "Fazer compras",
      completed: false,
    },
    {
      id: "a2",
      title: "Ir para academia",
      completed: true,
    },
  ]);

  const handleTaskAddition = ({ taskTitle }: { taskTitle: string }) => {
    console.log(">> " + taskTitle);
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];
    setTasks(newTasks);
  };

  const handleTaskClick = ({ taskId }: { taskId: string }) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTasks(newTasks);
  };

  const handleTaskRemove = ({ taskId }: { taskId: string }) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=8"
      );
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskRemove={handleTaskRemove}
                />
              </>
            }
          />
          <Route path="/:taskTitle" element={<TaskDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
