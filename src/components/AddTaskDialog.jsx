import "./AddTaskDialog.css"

import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const nodeRef = useRef() // used when needed to store a reference to a DOM node, in this case the div that contains the dialog
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { title: "", time: "", description: "" },
  })

  const handleSaveClick = async (data) => {
    const task = {
      ...data,
      id: uuidv4(),
      status: "not_started",
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      return toast.error("Erro ao adicionar tarefa!")
    }

    onSubmitSuccess(task)
    handleClose()
    reset({ title: "", time: "", description: "" })
  }

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div
        ref={nodeRef} // store this div inside variable nodeRef declared above, so we can use it in the CSSTransition component
        className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-md"
      >
        <div className="rounded-xl bg-white p-5 text-center shadow">
          <h2 className="text-brand-dark-blue text-xl font-bold">
            Nova tarefa
          </h2>
          <p className="text-brand-text-gray mt-1 mb-4 text-sm">
            Insira as informações
          </p>

          <form onSubmit={handleSubmit(handleSaveClick)}>
            <div className="flex w-84 flex-col space-y-4">
              <Input
                id="title"
                label="Título"
                placeholder="Insira o título da tarefa"
                disabled={isSubmitting}
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) => {
                    if (!value.trim()) return "O título não pode ser vazio"
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
              <TimeSelect
                disabled={isSubmitting}
                {...register("time", {
                  required: "O horário é obrigatório",
                })}
                errorMessage={errors?.time?.message}
              />
              <Input
                id="description"
                label="Descrição"
                placeholder="Descreva a tarefa"
                disabled={isSubmitting}
                {...register("description", {
                  required: "A descrição é obrigatório",
                })}
                errorMessage={errors?.description?.message}
              />
              <div className="flex gap-3">
                <Button
                  size="large"
                  color="secondary"
                  className="w-full"
                  type="button"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  size="large"
                  color="primary"
                  className="w-full"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting && <LoaderIcon className="mr-2 animate-spin" />}
                  Salvar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskDialog
