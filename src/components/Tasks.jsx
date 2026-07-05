import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const [addTaskDialogIsOpen, setTaskDialogIsOpen] = useState(false)

  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

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

    queryClient.setQueryData("tasks", updatedTasks)
  }

  const handleDialogClose = () => {
    setTaskDialogIsOpen(false)
  }

  const tasksMorning = tasks?.filter((task) => task.time === "morning")
  const tasksAfternoon = tasks?.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks?.filter((task) => task.time === "evening")

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
          />
        </div>
      </div>

      <div className="roundex-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {tasksMorning?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhum tarefa cadastrada para o período da manhã
            </p>
          )}
          {tasksMorning?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
            />
          ))}
        </div>

        <div className="my-3 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          {tasksAfternoon?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhum tarefa cadastrada para o período da manhã
            </p>
          )}
          {tasksAfternoon?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {tasksEvening?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhum tarefa cadastrada para o período da manhã
            </p>
          )}
          {tasksEvening?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleTaskCheckBoxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
