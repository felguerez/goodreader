import React from "react";
import styled from "@emotion/styled";

export function Signup() {
  return (
    <div>
      <Form
        action={`${process.env.REACT_APP_SERVER_API}/users/create`}
        method="POST"
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
