export type AlgolUserId = string;

export type AlgolRemoteUser = {
  userName: string;
  password: string;
  userId: AlgolUserId;
  gravatarHash?: string;
};

export type AlgolRemoteUserDisplayInfo = {
  userId: string;
  userName: string;
  gravatarHash?: string;
};
