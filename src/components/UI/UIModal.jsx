import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function UIModal({ children, open, className = "", close }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={close}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
