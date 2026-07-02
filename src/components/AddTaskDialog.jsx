import { createPortal } from "react-dom"

import Button from "./Button"
import Input from "./Input"

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-md">
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
          />
          <Input
            id="time"
            label="Horário"
            placeholder="Insira o horário da tarefa"
          />
          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
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
            <Button size="large" variant="primary" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
