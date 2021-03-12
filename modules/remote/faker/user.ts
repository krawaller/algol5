import { AlgolRemoteUser, AlgolRemoteUserAPI } from "../types/api/user";
import { currentUser, users } from "./atoms";

export const fakerUserAPI: AlgolRemoteUserAPI = {
  logout: () => currentUser.update(null),
  login: opts =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        const user = users
          .getValue()
          .find(
            u =>
              u.userName.toLowerCase() === opts.userName.toLowerCase() &&
              u.password === opts.password
          );
        if (user) {
          currentUser.update(user);
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
          .getValue()
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
          users.update(users.getValue().concat(newUser));
          currentUser.update(newUser);
          resolve(newUser);
        }
      }, 2000)
    ),
  subscribe: {
    user: opts => {
      opts.listener(currentUser.getValue());
      return currentUser.subscribe(opts.listener);
    },
  },
};
