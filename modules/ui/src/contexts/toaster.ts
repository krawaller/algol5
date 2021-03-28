import { createContext, useContext } from "react";
import { fakeToaster } from "../../../types";

export const ToasterContext = createContext(fakeToaster);

export const useToaster = () => {
  return useContext(ToasterContext);
};
