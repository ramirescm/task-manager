import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-task", taskId],
    mutationFn: async (task) => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        task
      )
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
