export const punctuate = (str: string) =>
  str.match(/[A-Za-z]$/) ? str + "." : str;
