import type { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

type ModalRootProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const ModalRoot = ({ isOpen, onClose, children }: ModalRootProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
      >
        {children}
      </div>
    </div>
  );
};

type ModalHeaderProps = {
  children?: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

const ModalHeader = ({ children, onClose, onSubmit }: ModalHeaderProps) => (
  <div className="flex justify-between items-center p-4 border-b">
    <h3 className="text-lg font-bold text-gray-800">{children}</h3>
    <div className="flex items-center gap-2">
      {/* ✅ Submit (Confirm) */}
      <button
        onClick={onSubmit}
        className="text-gray-600 hover:text-green-600 p-1 rounded-full transition-colors"
      >
        <FaCheck />
      </button>

      {/* ❌ Cancel / Close */}
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-red-600 p-1 rounded-full transition-colors"
      >
        <RxCross1 />
      </button>
    </div>
  </div>
);

type ModalBodyProps = {
  children?: ReactNode;
};

const ModalBody = ({ children }: ModalBodyProps) => (
  <div className="p-6">{children}</div>
);

const Modal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Body: ModalBody,
};

export default Modal;
