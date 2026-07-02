import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"
import TaskSeparator from "./TaskSeprator"
import { useState } from "react"
import TaskItem from "./TaskItem"
import TASKS from "../constants/tasks"
import { toast } from "sonner"

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)
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

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Bem-vindo à sua lista de tarefas!
          </span>
          <h1 className="mb-4 text-2xl font-bold">Minhas Tarefas</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <TrashIcon />
            Limpar tarefas
          </Button>
          <Button>
            <AddIcon />
            Nova tarefa
          </Button>
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
