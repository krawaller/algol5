import React, { FunctionComponent, useEffect } from "react";
import { UniversalPortal } from "@jesstelford/react-portal-universal";
import css from "./Modal.cssProxy";
import { Button } from "../Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
};

export const Modal: FunctionComponent<ModalProps> = props => {
  const { isOpen, onClose, title, children, subtitle } = props;
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);
  if (!isOpen) return null;
  return (
    <UniversalPortal selector="body">
      <div className={css.modalOverlay} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} className={css.modalContainer}>
          <div className={css.modalHeader}>
            <span className={css.modalTitle}>{title}</span>
            <div>
              <span className={css.modalSubtitle}>{subtitle}</span>
              <Button onClick={onClose}>X</Button>
            </div>
          </div>
          <div className={css.modalContent}>{children}</div>
        </div>
      </div>
    </UniversalPortal>
  );
};
