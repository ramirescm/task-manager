import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch task details")
        }
        const data = await response.json()
        setTask(data)
      } catch (error) {
        console.error("Error fetching task details:", error)
      }
    }

    fetchTaskDetails()
  }, [taskId])
  return (
    <div>
      <h1>Task Details Page</h1>
      {task && (
        <div>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      )}
    </div>
  )
}

export default TaskDetailsPage
