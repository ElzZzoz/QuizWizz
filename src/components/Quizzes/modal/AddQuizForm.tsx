import { useState, useContext, useEffect } from "react";
import { ModalContext } from "./ModalContext";
import api from "@/utils/api/AxiosInstance";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGroupsQuery } from "@/hooks/useGroupsQuery";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { QuizSuccessModal } from "./QuizSuccessModal";
import type { Quiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";
import FlexInput from "@/components/ui/FlexInput";
import FlexSelect from "@/components/ui/FlexSelect";
import type { ChangeHandler } from "@/types/form.types";

type QuizApiResponse = {
  data: Quiz;
  message: string;
};

const AddQuizForm = () => {
  const modal = useContext(ModalContext);
  const [successData, setSuccessData] = useState<Quiz | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    group: "",
    questions_number: 1,
    difficulty: "medium",
    type: "BE",
    schadule: "",
    duration: "",
    score_per_question: "",
  });

  const [loading, setLoading] = useState(false);

  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = useGroupsQuery();

  useEffect(() => {
    if (groups && groups.length > 0) {
      setFormData((prev) => ({
        ...prev,
        group: prev.group || groups[0]._id,
      }));
    }
  }, [groups]);

  const handleChange: ChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "questions_number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post<QuizApiResponse>("/quiz", formData);
      setSuccessData(response.data.data);
    } catch (error) {
      console.error(error);
      let errorMessage = "❌ Failed to create quiz. Please try again.";
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          errorMessage = `❌ ${error.response.data.message}`;
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formattedGroupOptions =
    groups?.map((group) => ({
      label: group.name,
      value: group._id,
    })) || [];

  if (successData) {
    return <QuizSuccessModal code={successData.code} />;
  }

  // --- UPDATED FOR RESPONSIVENESS ---
  return (
    <div className="w-full max-w-[650px] max-h-[85vh] md:max-h-[650px] overflow-y-auto rounded-lg relative bg-white flex flex-col p-4 md:p-6">
      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold">Add Quiz</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => modal?.closeModal()}
            className="flex items-center justify-center w-10 h-10 text-black rounded hover:text-gray-700 bg-transparent"
          >
            <FaXmark size={20} />
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || isLoadingGroups}
            className={`flex items-center justify-center w-10 h-10 rounded 
            ${
              loading || isLoadingGroups
                ? "text-gray-400 cursor-not-allowed"
                : "text-black hover:text-gray-700 bg-transparent"
            }`}
          >
            {loading ? (
              <AiOutlineLoading3Quarters size={20} className="animate-spin" />
            ) : (
              <FaCheck size={20} />
            )}
          </button>
        </div>
      </div>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <FlexInput
          id="title"
          name="title"
          type="text"
          label="Title"
          value={formData.title}
          onChange={handleChange}
        />

        {/* Description */}
        <FlexInput
          id="description"
          name="description"
          type="text"
          label="Description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Group Dropdown */}
        <FlexSelect
          id="group"
          name="group"
          label="Group"
          value={formData.group}
          onChange={handleChange}
          options={formattedGroupOptions}
          className="w-full"
          isLoading={isLoadingGroups}
          isError={isErrorGroups}
        />

        {/* Duration, Questions Number, Score per Question */}
        {/* --- UPDATED FOR RESPONSIVENESS --- */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FlexInput
            id="duration"
            name="duration"
            type="number"
            label="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="flex-1 min-w-0"
          />
          <FlexInput
            id="questions_number"
            name="questions_number"
            type="number"
            label="Questions"
            value={formData.questions_number}
            onChange={handleChange}
            className="flex-1 min-w-0"
          />
          <FlexInput
            id="score_per_question"
            name="score_per_question"
            type="number"
            label="Score"
            value={formData.score_per_question}
            onChange={handleChange}
            className="flex-1 min-w-0"
          />
        </div>

        {/* Schedule */}
        <FlexInput
          id="schadule"
          name="schadule"
          type="datetime-local"
          label="Schedule"
          value={formData.schadule}
          onChange={handleChange}
        />

        {/* Difficulty and Type */}
        {/* --- UPDATED FOR RESPONSIVENESS --- */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FlexSelect
            id="difficulty"
            name="difficulty"
            label="Difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            options={[
              { label: "Easy", value: "easy" },
              { label: "Medium", value: "medium" },
              { label: "Hard", value: "hard" },
            ]}
            className="flex-1 min-w-0"
          />
          <FlexSelect
            id="type"
            name="type"
            label="Type"
            value={formData.type}
            onChange={handleChange}
            options={[
              { label: "Backend", value: "BE" },
              { label: "Frontend", value: "FE" },
            ]}
            className="flex-1 min-w-0"
          />
        </div>
      </form>
    </div>
  );
};

export default AddQuizForm;
