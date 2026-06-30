import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"

const Tasks = () => {
  return (
    <div className="w-full px-8 py-6">
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

      {/* lista de tarefas */}
      <div className="roundex-xl bg-white p-6">
        {/* manha */}
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <SunIcon />
            <p className="text-sm text-[#9A9C9F]">Manha</p>
          </div>
        </div>

        {/* tarde */}
        <div className="my-3 space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <CloudSunIcon />
            <p className="text-sm text-[#9A9C9F]">Tarde</p>
          </div>
        </div>

        {/* noite */}
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <MoonIcon />
            <p className="text-sm text-[#9A9C9F]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tasks
