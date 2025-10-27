// hooks/useGroupsQuery.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api/AxiosInstance";
import type { Group } from "@/interfaces/GroupInterfaces/GroupInterfaces";

const fetchGroups = async (): Promise<Group[]> => {
  const response = await api.get("/group");
  return response.data; // adjust if different
};

export const useGroupsQuery = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ✅ Mutations (create, update, delete)
export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => api.post("/group", { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      api.put(`/group/${id}`, { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/group/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["groups"] }),
  });
};
