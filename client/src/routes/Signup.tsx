import React from "react";

export function Signup() {
  return (
    <div>
      <form action="/users/create">
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Let's do it</button>
      </form>
    </div>
  );
}
