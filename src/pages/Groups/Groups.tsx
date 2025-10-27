import { GroupsList } from "@/components";
import { useGroupsQuery } from "@/hooks/useGroupsQuery";
import { isAxiosError } from "axios";

export default function App() {
  const { data: groups = [], isLoading, error } = useGroupsQuery();

  if (isLoading) {
    return (
      <div className="text-center p-8 text-gray-500">Loading groups...</div>
    );
  }

  if (error) {
    let errorMessage: string;

    // 1. Check if it's an Axios error
    if (isAxiosError(error)) {
      // 2. Safely access the message from your backend
      errorMessage = error.response?.data?.message || error.message;
    }
    // 3. Check if it's just a standard JavaScript error
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
    // 4. Fallback for any other unknown error
    else {
      errorMessage = "An unknown error occurred.";
    }

    return (
      <div className="text-center p-8 bg-red-50 border-2 border-dashed border-red-300 rounded-lg">
        {/* 5. Render the error message string */}
        <p className="font-semibold text-red-600">{errorMessage}</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center p-8 border-dashed border-2 border-gray-300 rounded-lg">
        <p className="text-gray-500">No groups found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-100">
      {/* ✅ Pass groups data to the component! */}
      <GroupsList />
    </div>
  );
}
