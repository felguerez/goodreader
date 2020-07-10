import React, { useEffect } from "react";

export function Home() {
  useEffect(() => {
    (async () => {
      await fetch(`${process.env.REACT_APP_SERVER_API}/test`);
    })();
  }, []);
  return (
    <header className="App-header">
      <p>Good feeds</p>
    </header>
  );
}
