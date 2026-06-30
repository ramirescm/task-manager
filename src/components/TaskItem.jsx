const TaskItem = ({ task }) => {
  const getClassesStatus = () => {
    switch (task.status) {
      case "done":
        return "bg-[#00ADB5]/10 text-[#00ADB5]"
      case "in_progress":
        return "bg-[#FFAA04]/10 text-[#FFAA04]"
      case "not_started":
        return "bg-[#35383E]/10 text-[#35383E]"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getClassesStatus()}`}
    >
      {task.title}
    </div>
  )
}

export default TaskItem
