import api from "@/utils/api/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status?: string;
  role?: string;
  group?: {
    _id: string;
    name: string;
    status: string;
  };
  avatar?: string;
}

// Updated interface with populated students
export interface GroupDetailsPopulated {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: Student[]; // Now an array of Student objects
  max_students: number;
}

// Original interface (if you need it elsewhere)
export interface GroupDetails {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[]; // Array of student IDs
  max_students: number;
}

// Fetch function with populate parameter
const fetchGroupDetails = async (
  groupId: string
): Promise<GroupDetailsPopulated> => {
  const response = await api.get<GroupDetailsPopulated>(
    `/group/${groupId}?populate=students`
  );
  return response.data;
};

// The custom hook - now returns populated data
export const useGroupDetailsQuery = (groupId: string | null) => {
  return useQuery({
    queryKey: ["group", groupId, "populated"], // Added "populated" to distinguish cache
    queryFn: () => fetchGroupDetails(groupId!),
    enabled: !!groupId,
  });
};
