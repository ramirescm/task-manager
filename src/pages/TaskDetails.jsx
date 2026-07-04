import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
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

  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
    reset,
  } = useForm()

  const navigate = useNavigate()

  const handleBackClick = () => {
    window.history.back()
  }

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch task details")
        }
        const data = await response.json()
        setTask(data)
        reset(data)
      } catch (error) {
        console.error("Error fetching task details:", error)
      }
    }

    fetchTask()
  }, [taskId, reset])

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

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      return toast.error("Erro ao adicionar tarefa!")
    }

    const newTask = await response.json()
    setTask(newTask)
  }

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
          <form onSubmit={handleSubmit(handleSaveClick)}>
            <div className="bg-brand-white space-y-6 rounded-xl p-6">
              <div>
                <Input
                  id="title"
                  label="Título"
                  {...register("title", {
                    required: "O título é obrigatório",
                    validate: (value) => {
                      if (!value.trim()) {
                        return "O título não pode ser vazio"
                      }
                      return true
                    },
                  })}
                  errorMessage={errors?.title?.message}
                />
              </div>
              <div>
                <TimeSelect
                  {...register("time", {
                    required: "O horário é obrigatório",
                  })}
                  errorMessage={errors?.time?.message}
                />
              </div>
              <div>
                <Input
                  id="description"
                  label="Descrição"
                  {...register("description", {
                    required: "A descrição é obrigatória",
                  })}
                  errorMessage={errors?.description?.message}
                />
              </div>
            </div>
            <div className="flex w-full justify-end gap-3">
              <Button
                size="large"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <LoaderIcon className="animate-spin" />} Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default TaskDetailsPage
