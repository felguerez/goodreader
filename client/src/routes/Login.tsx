import React, { Dispatch } from "react";
import styled from "@emotion/styled";

export function Login({ dispatch }: { dispatch: Dispatch<any> }) {
  const loginUser = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const [email, password] = event.currentTarget.elements;
    const login = await fetch(
      `${process.env.REACT_APP_SERVER_API}/users/login`,
      {
        method: "POST",
        credentials: "same-origin",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ email: email.value, password: password.value }),
      }
    );

    if (login.ok) {
      const { user } = await login.json();
      dispatch({ type: "USER_LOADED", user });
    }
  };
  return (
    <div>
      <Form
        action={`${process.env.REACT_APP_SERVER_API}/users/login`}
        method="POST"
        onSubmit={loginUser}
      >
        <input type="text" name="email" />
        <input type="password" name="password" />
        <input type="submit" value="let's do it" />
      </Form>
    </div>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
