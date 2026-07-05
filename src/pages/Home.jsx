import { LoaderIcon, TasksIcon } from "../assets/icons"
import DashboardCard from "../components/DashboardCard"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useGetTasks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTasks()
  const notStarted = tasks?.filter(
    (tasks) => tasks.status === "not_started"
  ).length

  const completed = tasks?.filter((tasks) => tasks.status === "done").length

  const inProgress = tasks?.filter(
    (tasks) => tasks.status === "in_progress"
  ).length

  const all = tasks?.length

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full space-y-6 px-8 py-16">
          <Header title="Dashboard" subtitle="Dashboard" />
          <div className="grid grid-cols-4 gap-9">
            <DashboardCard
              icon={<TasksIcon />}
              mainText={all}
              secondaryText="Tarefas totais"
            />
            <DashboardCard
              icon={<LoaderIcon />}
              mainText={notStarted}
              secondaryText="Tarefas não iniciadas"
            />
            <DashboardCard
              icon={<LoaderIcon />}
              mainText={inProgress}
              secondaryText="Tarefas em andamento"
            />
            <DashboardCard
              icon={<TasksIcon />}
              mainText={completed}
              secondaryText="Tarefas concluídas"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
