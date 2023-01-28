import "./App.scss";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

import Auth from "./Components/Auth";
import { Loading } from "./Loading";
import Messanger from "./Screens/Messsanger";
import axios from "./axios";

function App() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("user"));
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Routes>
          <Route path="/" element={<Auth setUserName={setUserName} />} />
          <Route
            path="/dashboard"
            element={<Messanger axios={axios} userName={userName} />}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
