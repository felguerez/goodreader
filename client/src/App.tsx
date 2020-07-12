import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "@emotion/styled";
import "./App.css";
import { Navigation } from "./components/Navigation";
import { Home } from "./routes/Home";
import { Signup } from "./routes/Signup";
import { Login } from "./routes/Login";
import { useUser } from "./hooks/useUser";
import { User } from "./routes/User";

function App() {
  const [state, dispatch] = useUser();
  return (
    <Router>
      <Navigation />
      <AppContainer>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route
            path="/login"
            render={({ location }) => {
              return state.user?.email ? (
                <Redirect to={{ pathname: "/", state: { from: location } }} />
              ) : (
                <Login dispatch={dispatch} />
              );
            }}
          />
          <Route path="/user">
            <User user={state.user} />
          </Route>
          <Route
            path="/"
            render={({ location }) => {
              return state.user?.email ? <Home /> : <div>logged out</div>;
            }}
          />
        </Switch>
      </AppContainer>
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
