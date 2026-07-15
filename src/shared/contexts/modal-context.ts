import {createContext} from "react";

export interface IModalContext {
  isOpen: boolean;
  close: () => void;
}

export const ModalContext = createContext<IModalContext>({
  isOpen: false,
  close: () => {},
});
