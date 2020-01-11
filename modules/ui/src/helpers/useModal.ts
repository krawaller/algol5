import { useState, useCallback } from "react";

const noop = () => {};

export const useModal = (onChange: (to: boolean) => void = noop) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = useCallback(() => {
    setIsOpen(true);
    onChange(true);
  }, [setIsOpen]);
  const close = useCallback(() => {
    setIsOpen(false);
    onChange(false);
  }, [setIsOpen]);
  return [isOpen, open, close] as const;
};
