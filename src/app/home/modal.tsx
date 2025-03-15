import { useEffect, ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center modal">
      <div className="relative z-50 bg-gray-100 p-6 rounded-lg shadow-lg max-w-[90%] min-w-[40%] max-h-[90vh] ">
        <button className="p-1.5 px-3 rounded-4xl absolute top-1 right-1 color-tertiary cursor-pointer modal-button" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
      <div className="fixed inset-0" onClick={onClose}></div>
    </div>
  );
}