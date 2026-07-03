import "./AddTaskDialog.css"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

  const nodeRef = useRef() // used when needed to store a reference to a DOM node, in this case the div that contains the dialog
  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const handleSaveClick = () => {
    const newErrors = []

    if (!titleRef.current.value.trim()) {
      newErrors.push({
        field: "title",
        message: "O título é obrigatório.",
      })
    }

    if (!timeRef.current.value.trim()) {
      newErrors.push({
        field: "time",
        message: "O horário é obrigatório.",
      })
    }
    if (!descriptionRef.current.value.trim()) {
      newErrors.push({
        field: "description",
        message: "A descrição é obrigatória.",
      })
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    handleSubmit({
      id: uuidv4(),
      title: titleRef.current.value.trim(),
      time: timeRef.current.value.trim(),
      description: descriptionRef.current.value.trim(),
      status: "not_started",
    })
    handleClose()
  }

  const titleError = errors.find((error) => error.field === "title")
  const timeError = errors.find((error) => error.field === "time")
  const descriptionError = errors.find((error) => error.field === "description")

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
          <h2 className="text-xl font-bold text-[#35383E]">Nova tarefa</h2>
          <p className="mt-1 mb-4 text-sm text-[#9a9c9f]">
            Insira as informações
          </p>

          <div className="flex w-84 flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              errorMessage={titleError?.message}
              ref={titleRef}
            />
            <TimeSelect ref={timeRef} errorMessage={timeError?.message} />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
            />
            <div className="flex gap-3">
              <Button
                size="large"
                variant="secondary"
                className="w-full"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                size="large"
                variant="primary"
                className="w-full"
                onClick={handleSaveClick}
              >
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
