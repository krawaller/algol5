import React, { FunctionComponent, useState } from "react";
import { useCurrentUser, useRemoteAPI } from "../../../../remote/utils/context";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Input } from "../Input";

type AuthGuardProps = {
  content: () => React.ReactNode;
};

export const AuthGuard: FunctionComponent<AuthGuardProps> = props => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const user = useCurrentUser();
  const api = useRemoteAPI();
  if (!user)
    return (
      <div>
        <p>Must log in or register!</p>
        <Input
          value={userName}
          onValue={setUsername}
          disabled={disabled}
          placeholder="username"
          autoSelect
        />
        <br />
        <br />
        <Input
          value={password}
          onValue={setPassword}
          disabled={disabled}
          placeholder="password"
          password
        />
        <br />
        <br />
        <ButtonGroup>
          <Button
            text="Log in"
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              api.auth.actions
                .login({ userName, password })
                .catch(err => alert(err.message))
                .finally(() => setDisabled(false));
            }}
          />
          <Button
            text="Register"
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              api.auth.actions
                .register({ userName, password })
                .catch(err => alert(err.message))
                .finally(() => setDisabled(false));
            }}
          />
        </ButtonGroup>
      </div>
    );
  return (
    <div>
      <p>
        Logged in as {user.userName}!{" "}
        <Button onClick={api.auth.actions.logout}>Sign out</Button>
      </p>
      <hr />
      {props.content()}
    </div>
  );
};
