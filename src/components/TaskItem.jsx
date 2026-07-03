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

const TaskItem = ({ task, handleCheckBoxClick, handleDeleteClick }) => {
  const status = statusConfig[task.status]

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
        <Button variant="ghost" onClick={() => handleDeleteClick(task.id)}>
          <TrashIcon className="text-brand-text-gray" />
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

export default TaskItem
