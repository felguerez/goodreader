import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";

function App() {
  return (
    <Router>
      <AppContainer>
        <header className="App-header">
          <p>Good feeds</p>
        </header>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
`;
