const letters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];

export const newSessionId = () => {
  // TODO - make ID generation more robust
  return `L${randomLetter()}${randomLetter()}${randomLetter()}`;
};
