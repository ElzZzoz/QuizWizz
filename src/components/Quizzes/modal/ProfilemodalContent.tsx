// src/components/Quizzes/modal/ProfileModalContent.tsx

import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { FaUserCircle, FaEnvelope, FaUserShield } from "react-icons/fa";

// Define the props it will receive from the Navbar
type ProfileModalProps = {
  username: string; // This is the email based on your Navbar logic
  role: string;
};

export default function ProfileModalContent({
  username,
  role,
}: ProfileModalProps) {
  const modal = useContext(ModalContext);

  return (
    <div className="p-6 w-96 relative bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-center">Your Profile</h2>

      <div className="flex flex-col items-center gap-4">
        {/* Large Profile Icon */}
        <FaUserCircle size={80} className="text-gray-400" />

        <div className="w-full">
          {/* Email Row */}
          <div className="flex items-center gap-3 mb-3 p-2 rounded">
            <FaEnvelope className="text-gray-500" />
            <span className="text-gray-800">{username}</span>
          </div>

          {/* Role Row */}
          <div className="flex items-center gap-3 p-2 rounded">
            <FaUserShield className="text-gray-500" />
            <span className="text-gray-800 capitalize">{role}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={modal?.closeModal}
          className="mt-6 w-full bg-gray-200 text-gray-800 p-2 rounded hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
