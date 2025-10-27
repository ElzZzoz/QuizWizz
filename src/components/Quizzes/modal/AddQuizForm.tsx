import { useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import api from "@/utils/api/AxiosInstance";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddQuizForm = () => {
  const modal = useContext(ModalContext);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "questions_number" ||
        name === "duration" ||
        name === "score_per_question"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/quiz", formData);
      alert("✅ Quiz Created Successfully!");
      modal?.closeModal();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  const FlexInput = ({
    label,
    id,
    name,
    type,
    value,
    onChange,
    className = "",
  }: {
    label: string;
    id: string;
    name: string;
    type: string;
    value: string | number;
    onChange: any;
    className?: string;
  }) => (
    <div className={`flex items-center  ${className}`}>
      <div className="w-[100px] h-[38px] bg-[#FFEDDF] rounded flex items-center justify-center font-medium flex-shrink-0">
        {label}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="flex-1 border rounded-[10px] h-[38px] p-2 min-w-0"
        required
      />
    </div>
  );

  const FlexSelect = ({
    label,
    id,
    name,
    value,
    onChange,
    options,
  }: {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: any;
    options: { label: string; value: string }[];
    className?: string;
  }) => (
    <div className="flex items-center flex-1">
      <div className="w-[100px] h-[38px] bg-[#FFEDDF] rounded flex items-center justify-center font-medium flex-shrink-0">
        {label}
      </div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="flex-1 border rounded-[10px] h-[38px] p-2 min-w-0"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-[650px] max-h-[650px] overflow-y-auto rounded-lg relative bg-white  flex flex-col">
      <div className="flex items-center justify-between mb-4">
        {/* Title on the left */}
        <h2 className="text-xl font-bold">Add Quiz</h2>

        {/* Buttons on the right */}
        <div className="flex items-center gap-2">
          {/* Close Modal Button */}
          <button
            type="button"
            onClick={() => modal?.closeModal()}
            className="flex items-center justify-center w-10 h-10 text-black rounded hover:text-gray-700 bg-transparent"
          >
            <FaXmark size={20} />
          </button>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center justify-center w-10 h-10 rounded 
        ${
          loading
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

        {/* Duration, Questions Number, Score per Question */}
        <div className="flex gap-4 w-full">
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
        <div className="flex gap-4 w-full">
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
