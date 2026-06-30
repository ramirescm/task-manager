import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"

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
    </div>
  )
}

export default Tasks
