import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "../utils/type-utils.ts";

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
}) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
