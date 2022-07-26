import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Auth({ setUserName }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setUserName(email);
    localStorage.setItem("user", email);
    history.push("/dashboard");
  }
  console.log(email);
  return (
    <form className="messanger__sign__form" onSubmit={handleSubmit}>
      <div className="messanger__sign__form__heading">Lets get started</div>
      <input
        type="text"
        placeholder="User Name"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
