// src/components/Quizzes/modal/JoinQuizForm.tsx

import { useState, useContext } from "react";
import { ModalContext } from "./ModalContext";
import api from "@/utils/api/AxiosInstance";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6"; // <-- Import X icon

import type { Quiz } from "@/interfaces/QuizInterfaces/QuizInterfaces";

// --- Assumed API response structure ---
interface JoinQuizResponse {
  data: Quiz;
}

// --- Success Modal (Adapted from your QuizSuccessModal) ---
function JoinSuccessModal({ quiz }: { quiz: Quiz }) {
  const modal = useContext(ModalContext);

  const handleStartQuiz = () => {
    // TODO: Update this path if your "start quiz" route is different

    modal?.closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[450px] h-[300px] p-6 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-800 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
        <FaCheck size={32} className="text-white" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Successfully Joined Quiz!
      </h2>
      <p className="text-lg text-gray-700 mb-6">{quiz.title}</p>
      <button
        onClick={handleStartQuiz}
        className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        done
      </button>
    </div>
  );
}

// --- Main Form Component ---
export default function JoinQuizForm() {
  const modal = useContext(ModalContext); // <-- Get modal context
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<Quiz | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter a quiz code.");
      return;
    }

    setLoading(true);
    toast.loading("Joining quiz...", { id: "join-quiz" });

    try {
      const response = await api.post<JoinQuizResponse>("/quiz/join", { code });
      setSuccessData(response.data.data); // Save the quiz data
      toast.success("Joined quiz!", { id: "join-quiz" });
    } catch (error: unknown) {
      let errorMessage = "Failed to join quiz.";
      if (isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, { id: "join-quiz" });
    } finally {
      setLoading(false);
    }
  };

  // --- 1. RENDER SUCCESS MODAL ---
  if (successData) {
    return <JoinSuccessModal quiz={successData} />;
  }

  // --- 2. RENDER JOIN FORM (with new styles) ---
  return (
    <div className="p-6 w-96 relative bg-white rounded-lg">
      {/* --- Header with Icons --- */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Join a Quiz</h2>
        <div className="flex items-center gap-2">
          {/* Close (X) Icon */}
          <button
            type="button"
            onClick={() => modal?.closeModal()}
            className="flex items-center justify-center w-10 h-10 text-black rounded hover:text-gray-700 bg-transparent"
          >
            <FaXmark size={20} />
          </button>
          {/* Join (Check) Icon */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`flex items-center justify-center w-10 h-10 rounded ${
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

      {/* --- Form --- */}
      <form onSubmit={handleSubmit}>
        {/* --- Input Group (Label + Input) --- */}
        <div className="flex items-center">
          {/* Styled Label */}
          <label
            htmlFor="quizCode"
            className="flex items-center justify-center w-[100px] h-[58px] text-sm font-medium text-gray-700 bg-[#FFEDDF] rounded-l-[10px]"
          >
            Quiz Code
          </label>

          {/* Styled Input */}
          <input
            id="quizCode"
            type="text"
            placeholder="A1B2C3"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full h-[58px] p-2 border-t border-r border-b border-gray-300 rounded-r-[10px] uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* The submit button is now in the header */}
      </form>
    </div>
  );
}
