import CheckIcon from "../assets/icons/check.svg?react"
import LoaderIcon from "../assets/icons/loader.svg?react"
import DetailsIcon from "../assets/icons/details.svg?react"

const statusConfig = {
  done: {
    container: "bg-[#00ADB5]/10 text-[#00ADB5]",
    checkbox: "bg-[#00ADB5]",
  },
  in_progress: {
    container: "bg-[#FFAA04]/10 text-[#FFAA04]",
    checkbox: "bg-[#FFAA04]",
  },
  not_started: {
    container: "bg-[#35383E]/10 text-[#35383E]",
    checkbox: "bg-[#35383E]/10",
  },
}

const TaskItem = ({ task, handleTaskCheckBoxClick }) => {
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
            onChange={() => handleTaskCheckBoxClick(task.id)}
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="text-brand-white animate-spin" />
          )}
        </label>

        {task.title}
      </div>

      <a href="#" className="transition hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  )
}

export default TaskItem
