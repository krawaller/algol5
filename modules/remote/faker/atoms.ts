import { atom } from "klyva";
import { AlgolRemoteUser } from "../types/api/user";

export const currentUser = atom<AlgolRemoteUser | null>(null);

export const users = atom<AlgolRemoteUser[]>([
  {
    userId: "thisisaveryrandomguid",
    userName: "Kurt",
    password: "kurt123",
  },
]);
