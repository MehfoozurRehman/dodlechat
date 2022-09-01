import React, { Suspense, useEffect, useState } from "react";
import "./App.scss";
import Auth from "./Components/Auth";
import Messanger from "./Screens/Messsanger";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "./axios";
import { Loading } from "./Loading";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("user"));
  }, []);

  console.log(userName);
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Auth setUserName={setUserName} />
          </Route>
          <Route path="/dashboard">
            <Messanger axios={axios} userName={userName} />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
