import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";

function App() {
  return (
    <Router>
      <Navigation />
      <AppContainer>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
`;
