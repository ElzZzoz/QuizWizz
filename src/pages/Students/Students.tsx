import { useState } from "react";
import { useGroupsQuery } from "@/hooks/useGroupsQuery";
import { useGroupDetailsQuery } from "@/hooks/useGroupDetailsQuery";
import type { Student } from "@/hooks/useGroupDetailsQuery";

// --- Arrow SVG components ---
const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// --- Component ---
export default function Students() {
  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
    error: groupError,
  } = useGroupsQuery();

  const [activeIndex, setActiveIndex] = useState(0);
  const totalGroups = groups?.length || 0;

  // === Compute visible groups ===
  const visibleGroups =
    totalGroups > 0
      ? groups?.slice(activeIndex, activeIndex + 3) // show 3 groups max
      : [];

  // === Get first visible group’s ID for fetching students ===
  const activeGroupId = visibleGroups && visibleGroups[0]?._id;
  const { data: groupDetails, isLoading: isLoadingStudents } =
    useGroupDetailsQuery(activeGroupId ?? null);

  const students = groupDetails?.students || [];
  const areStudentsLoading = isLoadingStudents;

  // === Handlers ===
  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setActiveIndex((prev) => Math.min(prev + 1, Math.max(0, totalGroups - 3)));

  // === Render states ===
  if (isLoadingGroups) {
    return <div className="p-4 md:p-6">Loading groups...</div>;
  }
  if (isErrorGroups) {
    return (
      <div className="p-4 md:p-6">
        Error loading groups: {groupError?.message}
      </div>
    );
  }

  const activeGroup = groups?.[activeIndex] || null;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Student Groups</h1>

      {/* --- Group Selector --- */}
      <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="absolute left-0 z-10 p-1 bg-white rounded-full shadow-md disabled:opacity-30"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Group Buttons */}
        <div className="flex justify-center items-center gap-3 w-full md:px-10">
          {visibleGroups && visibleGroups.length > 0 ? (
            visibleGroups.map((group) => (
              <button
                key={group._id}
                onClick={() =>
                  setActiveIndex(
                    (groups ?? []).findIndex((g) => g._id === group._id)
                  )
                }
                className={`flex-1 md:flex-none w-full md:w-[130px] h-[35px] border rounded-lg md:rounded-[30px] flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  group._id === activeGroup?._id
                    ? "bg-orange-100 border-orange-400 text-orange-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-orange-50"
                }`}
              >
                {group.name}
              </button>
            ))
          ) : (
            <div className="w-full md:w-[130px] h-[35px] flex items-center justify-center text-sm text-gray-500">
              No Groups
            </div>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={activeIndex >= totalGroups - 3}
          className="absolute right-0 z-10 p-1 bg-white rounded-full shadow-md disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* --- Student List Section --- */}
      <div className="mt-8 max-w-lg mx-auto">
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          Students in {activeGroup?.name || "..."}
        </h2>

        {areStudentsLoading && (
          <div className="text-gray-500 text-sm">Loading students...</div>
        )}

        {!areStudentsLoading && (
          <>
            {students.length === 0 && (
              <div className="text-gray-500 text-sm">
                No students found in this group.
              </div>
            )}

            {students.length > 0 && (
              <ul className="list-none p-0 m-0 space-y-4">
                {students.map((student: Student) => (
                  <li
                    key={student._id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full h-[70px]"
                  >
                    {/* Left side */}
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-base font-semibold text-gray-900">
                          {student.first_name} {student.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>

                    {/* Right side */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
