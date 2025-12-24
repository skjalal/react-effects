import React, {
  type PropsWithChildren,
  useRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "../utils/type-utils.ts";

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ ref, children }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          dialog.current?.showModal();
        },
        close: () => {
          dialog.current?.close();
        },
      };
    },
    []
  );

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
