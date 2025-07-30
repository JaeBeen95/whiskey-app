import ModalPortal from "@/components/modal/ModalPortal";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-40 bg-black/80" onClick={onClose} aria-hidden="true" />
      <div className="fixed bg-white rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl mx-4">
        <div
          className="relative w-full p-8 shadow-glow-gold border border-gold-500/30 bg-parchment text-dark-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-gold-500/20">
            <h2 className="text-2xl font-serif text-gold-500">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 text-dark-gray-700/70 hover:text-gold-500 transition-colors duration-200 rounded-full"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="font-sans">{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
