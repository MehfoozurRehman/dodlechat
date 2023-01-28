import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Auth({ setUserName }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    setUserName(email);
    localStorage.setItem("user", email);
    navigate("/dashboard");
  }
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
