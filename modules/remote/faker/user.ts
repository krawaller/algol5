import { AlgolRemoteUserAPI } from "../types/api/user";
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
  subscribe: {
    user: opts => {
      opts.listener(currentUser.getValue());
      return currentUser.subscribe(opts.listener);
    },
  },
};
