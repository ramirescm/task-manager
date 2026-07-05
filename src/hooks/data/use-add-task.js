import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: "add-task",
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) throw new Error()

      const createdTask = response.json()
      return createdTask // passed as param to onSuccess
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData("tasks", (currentTasks) => {
        return [...currentTasks, createdTask]
      })
    },
  })
}
