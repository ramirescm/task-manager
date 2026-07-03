import { HomeIcon, TaskIcon } from "../assets/icons"
import SidebarButton from "./SidebarButton"

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white p-4">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <p>
          Um simples
          <span className="text-brand-primary">organizador de tarefa</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon className="text-brand-primary" /> Inicio
        </SidebarButton>
        <SidebarButton variant="selected">
          <TaskIcon /> Minhas tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
