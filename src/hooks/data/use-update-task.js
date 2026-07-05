import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (task) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, task)
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      // invalidated entire cache
      //   queryClient.invalidateQueries({
      //     queryKey: ["tasks"],
      //   })
      //if i want garantee without update manually
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask
        )
      )
    },
  })
}
