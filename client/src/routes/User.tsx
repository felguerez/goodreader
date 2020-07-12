import React from "react";

export function User({
  user,
}: {
  user: { email?: string; image_url?: string } | null;
}) {
  if (!user) {
    return (
      <div>
        <h1>logged out</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Email {user.email}</h1>
      {user.image_url && <img src={user.image_url} alt="" />}
    </div>
  );
}
