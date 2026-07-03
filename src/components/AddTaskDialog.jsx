import "./AddTaskDialog.css"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const nodeRef = useRef() // used when needed to store a reference to a DOM node, in this case the div that contains the dialog
  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const titleError = errors.find((error) => error.field === "title")
  const timeError = errors.find((error) => error.field === "time")
  const descriptionError = errors.find((error) => error.field === "description")

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

    const task = {
      id: uuidv4(),
      title,
      time,
      description,
      status: "not_started",
    }

    setIsLoading(true)
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      setIsLoading(false)
      return toast.error("Erro ao adicionar tarefa!")
    }

    onSubmitSuccess(task)
    setIsLoading(false)
    handleClose()
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

          <div className="flex w-84 flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              disabled={isLoading}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
            <TimeSelect
              disabled={isLoading}
              ref={timeRef}
              errorMessage={timeError?.message}
            />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              disabled={isLoading}
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
            />
            <div className="flex gap-3">
              <Button
                size="large"
                color="secondary"
                className="w-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                size="large"
                color="primary"
                className="w-full"
                disabled={isLoading}
                onClick={handleSaveClick}
              >
                {isLoading && <LoaderIcon className="mr-2 animate-spin" />}
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default AddTaskDialog
