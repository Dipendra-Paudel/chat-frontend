export const randomToken = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_";
  let randomString = "";

  for (let i = 0; i < 20; i++) {
    const num = Math.floor(Math.random() * characters.length);
    randomString += characters[num];
  }

  randomString += new Date().getTime();

  return randomString;
};
