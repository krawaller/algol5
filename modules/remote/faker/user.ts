import { AlgolRemoteUser, AlgolRemoteUserAPI } from "../types/api/user";

let currentUser: AlgolRemoteUser | null = null;
const subs = new Set<(user: AlgolRemoteUser | null) => void>();

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
          } else if (opts.userName.match(/[^A-Za-z0-9]/)) {
            throw new Error("Please only use English alphanumeric characters");
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
    auth: ({ listener }) => {
      if (!subs.has(listener)) {
        subs.add(listener);
      }
      return () => subs.delete(listener);
    },
  },
};
