import { atom } from "klyva";
import { AlgolStaticGameAPI } from "../../types";
import { AlgolRemoteUser } from "../types/api/user";

export const currentUser = atom<AlgolRemoteUser | null>(null);

export const users = atom<AlgolRemoteUser[]>([
  {
    userId: "thisisaveryrandomguid",
    userName: "Kurt",
    password: "kurt123",
  },
]);

export const game = atom<AlgolStaticGameAPI | null>(null);
