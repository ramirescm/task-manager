import "./AddTaskDialog.css"

import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")

  const nodeRef = useRef() // used when needed to store a reference to a DOM node, in this case the div that contains the dialog

  const resetForm = () => {
    setTitle("")
    setTime("")
    setDescription("")
  }

  const handleSaveClick = () => {
    if (!title.trim() || !time.trim() || !description.trim()) {
      alert("Todos os campos são obrigatórios")
      return
    }

    handleSubmit({
      id: uuidv4(),
      title,
      time,
      description,
      status: "not_started",
    })
    resetForm()
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
          <h2 className="text-xl font-bold text-[#35383E]">Nova tarefa</h2>
          <p className="mt-1 mb-4 text-sm text-[#9a9c9f]">
            Insira as informações
          </p>

          <div className="flex w-84 flex-col space-y-4">
            <Input
              id="title"
              label="Título"
              placeholder="Insira o título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TimeSelect
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Input
              id="description"
              label="Descrição"
              placeholder="Descreva a tarefa"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
