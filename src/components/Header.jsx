import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"

const Header = ({ subtitle, title }) => {
  const [addTaskDialogIsOpen, setTaskDialogIsOpen] = useState(false)
  const handleDialogClose = () => {
    setTaskDialogIsOpen(false)
  }

  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            {subtitle}
          </span>
          <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            <TrashIcon />
            Limpar tarefas
          </Button>
          <Button onClick={() => setTaskDialogIsOpen(true)}>
            <AddIcon />
            Nova tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
          />
        </div>
      </div>
    </>
  )
}

export default Header
