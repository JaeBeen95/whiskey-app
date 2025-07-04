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
      <div
        className="fixed inset-0 flex items-center justify-center p-4 z-[1000] bg-black bg-opacity-70 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-lg p-8 rounded-2xl shadow-whiskey-xl border-2 border-amber-primary bg-cream-bg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-4xl font-serif text-deep-brown text-center mb-6 font-bold drop-shadow-md">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-copper-accent hover:text-gold-primary transition-colors duration-300 rounded-full flex items-center justify-center"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          <div className="font-sans text-darker-brown leading-relaxed text-lg">{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
