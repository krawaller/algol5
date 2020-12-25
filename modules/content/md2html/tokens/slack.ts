import { slackInvite } from "../../../common";
import { extlink } from "./extlink";
import { TokenHandler } from "./_handler";

// Takes a SLACK token and renders a slack invite link

export const slack: TokenHandler = opts => {
  return extlink({
    ...opts,
    args: {
      ...opts.args,
      url: slackInvite,
    },
  });
};
