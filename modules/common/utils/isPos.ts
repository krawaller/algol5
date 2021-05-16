const identifyMark = /^[a-z]{1,2}[0-9]{1,2}$/;

export const isPos = (str: string) => identifyMark.test(str);
