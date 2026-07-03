import { useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import TASKS from "../constants/tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeprator"

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)
  const [addTaskDialogIsOpen, setTaskDialogIsOpen] = useState(false)
  const tasksMorning = tasks.filter((task) => task.time === "morning")
  const tasksAfternoon = tasks.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks.filter((task) => task.time === "evening")

  const handleTaskCheckBoxClick = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso!")
        return { ...task, status: "in_progress" }
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso!")
        return { ...task, status: "done" }
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada com sucesso!")
        return { ...task, status: "not_started" }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  const handleTaskDeleteClick = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    toast.success("Tarefa removida com sucesso!")
  }

  const handleDialogClose = () => {
    setTaskDialogIsOpen(false)
  }

  const handleAddTaskClick = (newTask) => {
    console.log("New task:", newTask)
    setTasks([...tasks, newTask])
    toast.success("Tarefa adicionada com sucesso!")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            Bem-vindo à sua lista de tarefas!
          </span>
          <h1 className="mb-4 text-2xl font-bold">Minhas Tarefas</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            <TrashIcon />
            Limpar tarefas
          </Button>
          <Button onClick={() => setTaskDialogIsOpen(true)}>
            <AddIcon />
            Nova tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
            handleSubmit={handleAddTaskClick}
          />
        </div>
      </div>

      <div className="roundex-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {tasksMorning.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-3 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />

          {tasksAfternoon.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {tasksEvening.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
