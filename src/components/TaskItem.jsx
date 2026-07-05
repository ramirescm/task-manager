import { useMutation, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons"
import Button from "./Button"

const statusConfig = {
  done: {
    container: "bg-brand-primary/10 text-brand-primary",
    checkbox: "bg-brand-primary",
  },
  in_progress: {
    container: "bg-brand-process/10 text-brand-process",
    checkbox: "bg-brand-process",
  },
  not_started: {
    container: "bg-brand-dark-blue/10 text-brand-dark-blue",
    checkbox: "bg-brand-dark-blue/10",
  },
}

const TaskItem = ({ task, handleCheckBoxClick }) => {
  const status = statusConfig[task.status]

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteTask", task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "DELETE",
      })
      return response.json()
    },
  })

  const handleDeleteClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData("tasks", (currentTasks) => {
          return currentTasks.filter(
            (currentTask) => currentTask.id !== task.id
          )
        })

        toast.success("Tarefa removida com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao excluir tarefa")
      },
    })
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${status.container}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-white ${status.checkbox}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckBoxClick(task.id)}
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={() => handleDeleteClick(task.id)}
          disabled={isPending}
        >
          {isPending ? (
            <LoaderIcon className="text-brand-text-gray animate-spin" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/tasks/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    status: PropTypes.oneOf(["not_started", "in_progress", "done"]).isRequired,
  }).isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
}

export default TaskItem
