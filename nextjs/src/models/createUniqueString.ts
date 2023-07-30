export const createUniqueString = (): string => {
  const date: number = new Date().getTime();
  const randomNum: number = Math.floor(Math.random() * 1000);
  const uniqueString: string = date.toString(16) + randomNum.toString(16);

  return uniqueString;
};
