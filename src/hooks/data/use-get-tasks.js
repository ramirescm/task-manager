import { useQuery } from "@tanstack/react-query"

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks")
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      const tasks = await response.json()
      return tasks
    },
  })
}

export const useGetTaskById = (taskId) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch task details")
      }
      const task = await response.json()
      return task
    },
  })
}
