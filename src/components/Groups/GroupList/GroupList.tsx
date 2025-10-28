import { GroupCard } from "@/components";
import { Pagination } from "@/components";
import type { Group } from "@/interfaces/GroupInterfaces/GroupInterfaces";
import type { ModalMode } from "@/types";
import { useState } from "react";
import Modal from "@/components/shared/Modal/Modal";
import { FaPlus } from "react-icons/fa";
import {
  useCreateGroup,
  useDeleteGroup,
  useGroupsQuery,
  useUpdateGroup,
} from "@/hooks/useGroupsQuery";
import toast from "react-hot-toast"; // --- 1. Import toast ---
import { isAxiosError } from "axios"; // --- (Optional) For better error messages ---

export default function GroupsList() {
  const { data: groups = [] } = useGroupsQuery();
  const createGroup = useCreateGroup();
  const updateGroup = useUpdateGroup();
  const deleteGroup = useDeleteGroup();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // ✅ Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = groups.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // ✅ Modal handlers
  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedGroup(null);
  };
  const handleOpenEditModal = (group: Group) => {
    setModalMode("edit");
    setSelectedGroup(group);
  };
  const handleOpenDeleteModal = (group: Group) => {
    setModalMode("delete");
    setSelectedGroup(group);
  };
  const handleCloseModal = () => {
    setModalMode(null);
    setSelectedGroup(null);
  };

  // --- 2. CRUD API calls updated with toast.promise ---

  const handleCreateGroup = async (groupName: string) => {
    const promise = createGroup.mutateAsync(groupName);

    toast.promise(promise, {
      loading: "Creating group...",
      success: "Group created successfully!",
      error: (err) =>
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to create group.",
    });

    try {
      await promise;
      handleCloseModal(); // Only close modal on success
    } catch (error) {
      // Don't close modal on error
      console.log(error);
    }
  };

  const handleUpdateGroup = async (groupId: string, groupName: string) => {
    const promise = updateGroup.mutateAsync({ id: groupId, name: groupName });

    toast.promise(promise, {
      loading: "Updating group...",
      success: "Group updated successfully!",
      error: (err) =>
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to update group.",
    });

    try {
      await promise;
      handleCloseModal(); // Only close modal on success
    } catch (error) {
      // Don't close modal on error
      console.log(error);
    }
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return;
    const promise = deleteGroup.mutateAsync(selectedGroup._id);

    toast.promise(promise, {
      loading: "Deleting group...",
      success: "Group deleted successfully!",
      error: (err) =>
        isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : "Failed to delete group.",
    });

    try {
      await promise;
      handleCloseModal(); // Only close modal on success
    } catch (error) {
      // Don't close modal on error
      console.log(error);
    }
  };

  // ✅ No groups found
  if (groups.length === 0) {
    // ... (no changes in this block)
    return (
      <div className="text-center p-8 border-dashed border-2 border-gray-300 rounded-lg">
        <p className="text-gray-500">No groups found.</p>
        <button
          onClick={handleOpenAddModal}
          className="mt-4 flex items-center gap-2 border border-gray-900 bg-white text-black font-semibold px-4 py-2 rounded-[50px] hover:bg-gray-300 transition-colors"
        >
          <FaPlus /> Add Group
        </button>
      </div>
    );
  }

  // ... (no changes in the return/JSX)
  return (
    <div className="bg-gray-50 p-6 rounded-xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Groups list</h2>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 border border-gray-900 bg-white text-black font-semibold px-4 py-2 rounded-[50px] hover:bg-gray-300 transition-colors"
        >
          <FaPlus /> Add Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentItems.map((group) => (
          <GroupCard
            key={group._id}
            group={group}
            onEdit={handleOpenEditModal}
            onDelete={handleOpenDeleteModal}
          />
        ))}
      </div>

      {groups.length > itemsPerPage && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={groups.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}

      {/* ✅ Modal (no changes) */}
      <Modal.Root isOpen={!!modalMode} onClose={handleCloseModal}>
        {modalMode === "add" || modalMode === "edit" ? (
          <>
            <Modal.Header
              onClose={handleCloseModal}
              onSubmit={() => {
                const form = document.getElementById(
                  "group-form"
                ) as HTMLFormElement;
                form.requestSubmit();
              }}
            >
              {modalMode === "add" ? "Set up a new Group" : "Edit Group"}
            </Modal.Header>
            <Modal.Body>
              <form
                id="group-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const groupName = (e.target as HTMLFormElement).groupName
                    .value;
                  if (modalMode === "add") {
                    handleCreateGroup(groupName);
                  } else if (selectedGroup) {
                    handleUpdateGroup(selectedGroup._id, groupName);
                  }
                }}
              >
                <label className="block text-sm font-medium">Group Name</label>
                <input
                  type="text"
                  name="groupName"
                  defaultValue={selectedGroup?.name || ""}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </form>
            </Modal.Body>
          </>
        ) : modalMode === "delete" ? (
          <>
            <Modal.Header
              onClose={handleCloseModal}
              onSubmit={handleDeleteGroup}
            >
              Delete Group
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete "{selectedGroup?.name}"?</p>
            </Modal.Body>
          </>
        ) : null}
      </Modal.Root>
    </div>
  );
}
