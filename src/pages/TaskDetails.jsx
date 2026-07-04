import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)

  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const navigate = useNavigate()

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
        console.log(data)
        setTask(data)
      } catch (error) {
        console.error("Error fetching task details:", error)
      }
    }

    fetchTaskDetails()
  }, [taskId])

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete task")
      }

      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao excluir tarefa")
    }
  }

  const handleSaveClick = async () => {
    const newErrors = []

    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({
        field: "title",
        message: "O título é obrigatório.",
      })
    }

    if (!time.trim()) {
      newErrors.push({
        field: "time",
        message: "O horário é obrigatório.",
      })
    }
    if (!description.trim()) {
      newErrors.push({
        field: "description",
        message: "A descrição é obrigatória.",
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    setSaveIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ title, time, description }),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error("Erro ao adicionar tarefa!")
    }

    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
  }

  const titleError = errors.find((error) => error.field === "title")
  const timeError = errors.find((error) => error.field === "time")
  const descriptionError = errors.find((error) => error.field === "description")

  return (
    task && (
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
                <Link className="text-brand-text-gray cursor-pointer" to="/">
                  Minhas Compras
                </Link>
                <ChevronRightIcon className="text-brand-text-gray" />
                <span className="text-brand-primary font-semibold">
                  {task?.title}
                </span>
              </div>

              <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
            </div>
            <Button
              color="danger"
              className="h-fit self-end"
              onClick={handleDeleteClick}
            >
              <TrashIcon />
              Deletar tarefa
            </Button>
          </div>
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <div>
              <Input
                id="title"
                label="Título"
                defaultValue={task?.title}
                errorMessage={titleError?.message}
                ref={titleRef}
              />
            </div>
            <div>
              <TimeSelect
                defaultValue={task?.time}
                errorMessage={timeError?.message}
                ref={timeRef}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description}
                errorMessage={descriptionError?.message}
                ref={descriptionRef}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              onClick={handleSaveClick}
              disabled={saveIsLoading}
            >
              {saveIsLoading && <LoaderIcon className="animate-spin" />} Salvar
            </Button>
          </div>
        </div>
      </div>
    )
  )
}

export default TaskDetailsPage
