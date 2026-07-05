import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-task", taskId],
    mutationFn: async (task) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error("Failed to update task")
      }

      const updatedTask = response.json()
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      // invalidated entire cache
      //   queryClient.invalidateQueries({
      //     queryKey: ["tasks"],
      //   })
      //if i want garantee without update manually
      queryClient.setQueryData(["tasks"], (currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask
        )
      )
    },
  })
}
