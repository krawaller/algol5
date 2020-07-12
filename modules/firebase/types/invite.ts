export type FirebaseUserInvite = {
  variant: string;
  wantstobe: 1 | 2 | null;
};

export type FirebaseFullInvite = FirebaseUserInvite & {
  inviter: string; // userid
  gameid: string;
  created: number;
};
