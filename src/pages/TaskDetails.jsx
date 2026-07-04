import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)

  const handleBackClick = () => {
    window.history.back()
  }

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch task details")
        }
        const data = await response.json()
        setTask(data)
      } catch (error) {
        console.error("Error fetching task details:", error)
      }
    }

    fetchTaskDetails()
  }, [taskId])
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="bg-brand-primary mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span
                className="text-brand-text-gray cursor-pointer"
                onClick={handleBackClick}
              >
                Minhas Compras
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="text-brand-primary font-semibold">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button color="danger" className="h-fit self-end">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        <div className="bg-brand-white space-y-6 rounded-xl p-6">
          <div>
            <Input id="title" label="Título" value={task?.title} />
          </div>
          <div>
            <TimeSelect value={task?.time} />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
