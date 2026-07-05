import { CloudSunIcon, MoonIcon, SunIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const { data: tasks } = useGetTasks()

  const tasksMorning = tasks?.filter((task) => task.time === "morning")
  const tasksAfternoon = tasks?.filter((task) => task.time === "afternoon")
  const tasksEvening = tasks?.filter((task) => task.time === "evening")

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title="Minhas tarefas" subtitle="Minhas tarefas" />
      <div className="roundex-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {tasksMorning?.length === 0 && (
            <p className="text-brand-text-gray text-sm">
              Nenhum tarefa cadastrada para o período da manhã
            </p>
          )}
          {tasksMorning?.map((task) => (
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
