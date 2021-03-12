import { AlgolRemoteUser, AlgolRemoteUserAPI } from "../types/api/user";
import { makeFakerVal } from "./utils";

const kurt: AlgolRemoteUser = {
  userId: "thisisaveryrandomguid",
  userName: "Kurt",
  password: "kurt123",
};

const users = makeFakerVal<AlgolRemoteUser[]>([kurt]);
const currentUser = makeFakerVal<AlgolRemoteUser | null>(null);

export const fakerUserAPI: AlgolRemoteUserAPI = {
  logout: () => currentUser.setVal(null),
  login: opts =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        const user = users
          .getVal()
          .find(
            u =>
              u.userName.toLowerCase() === opts.userName.toLowerCase() &&
              u.password === opts.password
          );
        if (user) {
          currentUser.setVal(user);
          resolve(user);
        } else {
          reject(new Error("No user with that info found"));
        }
      }, 2000)
    ),
  register: opts =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        const existingUser = users
          .getVal()
          .find(u => u.userName.toLowerCase() === opts.userName.toLowerCase());
        if (existingUser) {
          reject(new Error("Username is taken"));
        } else if (opts.userName.match(/[^A-Za-z0-9]/)) {
          throw new Error("Please only use English alphanumeric characters");
        } else {
          const newUser: AlgolRemoteUser = {
            ...opts,
            userId: Math.random()
              .toString()
              .slice(2),
          };
          users.setVal(users.getVal().concat(newUser));
          currentUser.setVal(newUser);
          resolve(newUser);
        }
      }, 2000)
    ),
  subscribe: {
    user: opts => {
      return currentUser.subscribe(opts);
    },
  },
};
