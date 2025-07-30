import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const modalRootRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    modalRootRef.current = document.getElementById("modal-root");
    setMounted(true);
  }, []);

  if (!mounted || !modalRootRef.current) {
    return null;
  }

  return createPortal(children, modalRootRef.current);
};

export default ModalPortal;
