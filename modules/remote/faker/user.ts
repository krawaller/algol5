import { AlgolRemoteUser, AlgolRemoteUserAPI } from "../types/api/user";

let currentUser: AlgolRemoteUser | null = null;
const subs = new Set<(user: AlgolRemoteUser) => void>();

const setLoggedInUser = (user: AlgolRemoteUser | null) => {
  currentUser = user;
  for (const listener of subs) {
    listener(currentUser);
  }
};

const kurt: AlgolRemoteUser = {
  userId: "thisisaveryrandomguid",
  userName: "Kurt",
  password: "kurt123",
};

const users = [kurt];

export const fakerUserAPI: AlgolRemoteUserAPI = {
  actions: {
    logout: () => setLoggedInUser(null),
    login: opts =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const user = users.find(
            u => u.userName === opts.userName && u.password === opts.password
          );
          if (user) {
            resolve(user);
            setLoggedInUser(user);
            resolve(user);
          } else {
            reject(new Error("No user with that info found"));
          }
        }, 2000)
      ),
    register: opts =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          const existingUser = users.find(u => u.userName === opts.userName);
          if (existingUser) {
            reject(new Error("Username is taken"));
          } else {
            const newUser: AlgolRemoteUser = {
              ...opts,
              userId: Math.random()
                .toString()
                .slice(2),
            };
            users.push(newUser);
            setLoggedInUser(newUser);
            resolve(newUser);
          }
        }, 2000)
      ),
  },
  subs: {
    auth: opts => {
      if (!subs.has(opts.listener)) {
        subs.add(opts.listener);
        return () => subs.delete(opts.listener);
      }
    },
  },
};
