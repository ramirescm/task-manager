import { useEffect } from "react"
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
import { useDeleteTask } from "../hooks/data/use-delete-task"
import { useGetTaskById } from "../hooks/data/use-get-tasks"
import { useUpdateTask } from "../hooks/data/use-update-task"

const TaskDetailsPage = () => {
  const { taskId } = useParams()

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm()

  const navigate = useNavigate()

  const handleBackClick = () => {
    window.history.back()
  }

  const { data: task } = useGetTaskById(taskId)

  useEffect(() => {
    if (task) {
      reset(task)
    }
  }, [task, reset])

  const { mutate: deleteTask, isPending: deletingTask } = useDeleteTask(taskId)
  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        navigate("/")
      },
      onError: () => {
        toast.error("Erro ao excluir tarefa")
      },
    })
  }

  const { mutate: updateTask, isPending: updatingTask } = useUpdateTask(taskId)
  const handleSaveClick = async (task) => {
    updateTask(task, {
      onError: () => {
        toast.error("Erro ao adicionar tarefa!")
      },
    })
  }

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
              disabled={deletingTask || updatingTask}
            >
              {(deletingTask || updatingTask) && (
                <LoaderIcon className="animate-spin" />
              )}{" "}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
