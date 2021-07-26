const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];

export const newSessionId = (remote?: boolean) => {
  // TODO - make ID generation more robust
  return `${
    remote ? "R" : "L"
  }${randomLetter()}${randomLetter()}${randomLetter()}`;
};
