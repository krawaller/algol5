The config for our firebase web app:

```typescript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsflVup9WlWY7ret5guHMG-8uFu6b9RMA",
  authDomain: "chessicals-2fdfa.firebaseapp.com",
  databaseURL: "https://chessicals-2fdfa.firebaseio.com",
  projectId: "chessicals-2fdfa",
  storageBucket: "chessicals-2fdfa.appspot.com",
  messagingSenderId: "742072307540",
  appId: "1:742072307540:web:87121aa6559fbfd26502c1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

### Database structure

```javascript
const db = {
  webapp: {
    stats: {
      "<gameid>": {
        "<variantcode>": {
          plr1wins: number,
          plr2wins: number,
          draws: number,
        },
      },
    },
    invites: {
      "<inviteid>": {
        inviter: "<userid>",
        gameid: "<gameid>",
        variant: "<variantcode>",
        wantstobe: 1 | 2 | "random",
        created: "<timestamp>",
      },
    },
  },
  users: {
    "<userid>": {
      webapp: {
        stats: {
          "<gameid>": {
            "<variantcode>": {
              "<asplr1|2>": {
                wins: number,
                draws: number,
                losses: number,
              },
            },
          },
        },
        sessions: {
          "<gameid>": {
            "<sessionid>": {
              queue: string | null,
              data: {
                plr1: "<userid>",
                plr2: "<userid>",
                plr1name: string,
                plr2name: string,
                who: 1 | 2,
                endedBy: string | null,
                turn: int,
                screenshot: string,
                updated: "<timestamp>",
                save: string,
              },
            },
          },
        },
        invites: {
          "<gameid>": {
            "<webinviteid>": {
              variant: "<variantcode>",
              wantstobe: 1 | 2 | "random",
            },
          },
        },
      },
    },
  },
};
```
