import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'


const App = () => {
  console.log("PROCESS: ", process.env.REACT_APP_CLIENT_ID)
  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Route path="/auth" exact component={Auth} />
          </GoogleOAuthProvider>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
