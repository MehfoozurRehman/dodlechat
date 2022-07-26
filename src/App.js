import React, { useEffect, useState } from "react";
import "./App.scss";
import Auth from "./Components/Auth";
import Messanger from "./Screens/Messsanger";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "./axios";
import { Loading } from "./Loading";

function App() {
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    axios.get("/v1/findAllRooms").then((res) => {
      setLoading(false);
      setRooms(res.data);
    });
    axios.get("/v1/findAllMessages").then((res) => {
      setMessages(res.data);
    });
  }, []);
  console.log(userName);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Auth setUserName={setUserName} />
        </Route>
        <Route path="/dashboard">
          {loading ? (
            <Loading />
          ) : (
            <Messanger
              messages={messages}
              rooms={rooms}
              axios={axios}
              userName={userName}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
