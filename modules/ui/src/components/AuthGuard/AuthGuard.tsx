import React, { useState } from "react";
import { useCurrentUser, useRemoteAPI } from "../../../../remote/utils/context";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { Input } from "../Input";
import styles from "./AuthGuard.cssProxy";

type AuthGuardProps = {
  Content?: () => JSX.Element;
  noHeader?: boolean;
  bypass?: boolean;
  children?: JSX.Element;
};

export const AuthGuard = ({
  Content,
  noHeader,
  bypass,
  children,
}: AuthGuardProps) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const user = useCurrentUser();
  const remote = useRemoteAPI();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setDisabled(true);
    remote.auth
      .login({ userName, password })
      .then(() => {
        setUsername("");
        setPassword("");
      })
      .catch(err => alert(err.message))
      .finally(() => setDisabled(false));
  };
  const content = Content ? <Content /> : children ?? null;
  if (!user && !bypass)
    return (
      <form className={styles.AuthGuardForm} onSubmit={handleSubmit}>
        <p>Must log in!</p>
        <Input
          value={userName}
          onValue={setUsername}
          disabled={disabled}
          placeholder="username (kurt)"
          autoSelect
        />
        <br />
        <br />
        <Input
          value={password}
          onValue={setPassword}
          disabled={disabled}
          placeholder="password (kurt123)"
          password
        />
        <br />
        <br />
        <ButtonGroup>
          <Button text="Log in" disabled={disabled} onClick={handleSubmit} />
        </ButtonGroup>
      </form>
    );
  return noHeader || bypass ? (
    content
  ) : (
    <div>
      <p>
        Logged in as {user?.userName}!{" "}
        <Button onClick={remote.auth.logout}>Sign out</Button>
      </p>
      <hr />
      {content}
    </div>
  );
};
