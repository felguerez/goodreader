import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export function Navigation() {
  return (
    <NavigationBar>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>
    </NavigationBar>
  );
}

const NavigationBar = styled.nav`
  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 0.5rem;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
