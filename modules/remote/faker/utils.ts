import { Subscriber } from "../types/helpers";

export type FakerVal<Data> = {
  getVal: () => Data;
  setVal: (val: Data) => void;
  subscribe: Subscriber<Data>;
};

export const makeFakerVal = <Data>(init: Data): FakerVal<Data> => {
  let inMemVal = init;
  const listeners = new Set<(data: Data) => void>();
  return {
    getVal: () => inMemVal,
    setVal: data => {
      inMemVal = data;
      listeners.forEach(listener => listener(inMemVal));
    },
    subscribe: ({ listener }) => {
      if (!listeners.has(listener)) {
        listeners.add(listener);
        listener(inMemVal);
      }
      return () => listeners.delete(listener);
    },
  };
};
