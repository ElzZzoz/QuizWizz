// Modal.tsx
import ReactDOM from "react-dom";
import { useModal } from "@/hooks/useModal";

export const Modal = () => {
  const { isOpen, content, closeModal } = useModal();
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="
        fixed inset-0 flex items-center justify-center 
        bg-black/30 backdrop-blur-sm z-[9999]
      "
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 rounded-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>,
    document.body
  );
};
