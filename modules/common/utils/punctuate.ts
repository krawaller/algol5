export const punctuate = (str: string, suff?: string) =>
  str.match(/[A-Za-z]$/) ? str + (suff || ".") : str;
