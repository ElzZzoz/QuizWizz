// src/components/QuizSuccessModal.tsx

import { useContext } from "react";
import { ModalContext } from "./ModalContext"; // Adjust path as needed
import { FaCheck } from "react-icons/fa";

type QuizSuccessModalProps = {
  code: string;
};

export function QuizSuccessModal({ code }: QuizSuccessModalProps) {
  const modal = useContext(ModalContext);

  if (!modal) return null;

  return (
    // Based on Figma: 450px x 300px
    <div className="bg-white rounded-lg shadow-lg w-[450px] h-[300px] p-6 flex flex-col items-center justify-center text-center">
      {/* 1. Checkmark Icon */}
      <div className="bg-gray-800 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
        <FaCheck size={32} className="text-white" />
      </div>

      {/* 2. Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Quiz was successfully created
      </h2>

      {/* 3. Code Box */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-sm font-medium text-gray-500">CODE:</span>
        <span className="bg-gray-100 text-gray-800 font-mono text-base font-bold px-4 py-2 rounded">
          {code}
        </span>
      </div>

      {/* 4. Close Button */}
      <button
        onClick={modal.closeModal}
        className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Close
      </button>
    </div>
  );
}
