import { createPortal } from "react-dom"

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-md">
      <div className="rounded-xl bg-white p-5 shadow">
        <h2 className="text-xl font-bold text-[#35383E]">Nova tarefa</h2>
        <p className="mt-1 text-sm text-[#9a9c9f]">Insira as informações</p>
      </div>
    </div>,
    document.body
  )
}

export default AddTaskDialog
