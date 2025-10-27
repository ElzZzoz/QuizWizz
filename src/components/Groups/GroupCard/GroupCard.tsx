import { CiEdit, CiTrash } from "react-icons/ci";
import type { GroupCardProps } from "@/interfaces/GroupInterfaces/GroupInterfaces";

export default function GroupCard({ group, onEdit, onDelete }: GroupCardProps) {
  const studentCount = group.students.length;

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm w-full">
      {/* Left side: Group Info */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-gray-800">{group.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          No. of students : {studentCount}
        </p>
      </div>

      {/* Right side: Action Icons */}
      <div className="flex items-center space-x-4 text-gray-500">
        <button
          className="hover:text-blue-600 transition-colors duration-200"
          aria-label={`Edit group ${group.name}`}
          onClick={() => onEdit(group)}
        >
          <CiEdit size={25} />
        </button>
        <button
          className="hover:text-red-600 transition-colors duration-200"
          aria-label={`Delete group ${group.name}`}
          onClick={() => onDelete(group)}
        >
          <CiTrash size={25} />
        </button>
      </div>
    </div>
  );
}
